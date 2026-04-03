import { EditorView, basicSetup } from 'codemirror';

import browser, { storage } from 'webextension-polyfill';

const codeDB = {
  async get(key) {
    const data = await browser.storage.local.get('savedCode');

    return data?.savedCode?.[key] ?? null;
  },
  async set(key, value) {
    const prevData = (await browser.storage.local.get('savedCode')) ?? {};

    return browser.storage.local.set({
      savedCode: {
        ...prevData.savedCode,
        [key]: value,
      },
    });
  },
  clear() {
    return browser.storage.local.remove('savedCode');
  },

  async getAll() {
    return browser.storage.local.get('savedCode');
  },
};

document.addEventListener('DOMContentLoaded', async function () {
  let [currentTab] = await browser.tabs.query({ active: true, currentWindow: true });
  const currentUrl = currentTab.url;
  const cacheKey = new URL(currentUrl).host + new URL(currentUrl).pathname;

  const codeContainer = document.getElementById('code');
  const executeBtn = document.getElementById('executeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const resultDiv = document.getElementById('result');

  const savedData = await codeDB.get(cacheKey);

  const view = new EditorView({
    parent: codeContainer,
  });
  // const view = new EditorView({
  //   parent: codeContainer,
  //   doc: `console.log("Hello world")`,
  //   extensions: [basicSetup, javascript()],
  // });

  // if (savedData) {
  //   executeCode(currentTab, savedData);
  // }

  executeBtn.addEventListener('click', async function () {
    const code = view.state.doc.toString();

    executeCode(currentTab, code);
    try {
      await codeDB.set(cacheKey, code);
    } catch (error) {
      console.log(error);
    }
  });

  clearBtn.addEventListener('click', function () {
    resultDiv.textContent = '';
    resultDiv.className = '';
    codeDB.clear();
  });
});

async function executeCode(tab, code) {
  if (!tab.id) return;

  const execute = (code) => {
    const generateCode = new Function(code);
    generateCode();
  };

  const results = await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: execute,
    args: [code],
    world: 'MAIN', // Выполняем в основном мире страницы
  });

  const result = results[0].result;
}
