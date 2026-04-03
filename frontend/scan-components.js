import fs from "fs/promises";
import path from "path";

/**
 * Сканирует папки с компонентами и создает:
 * 1. TXT файлы с исходным кодом каждого файла
 * 2. JSON файл с метаинформацией для каждой папки компонента
 */
async function scanComponents(rootDir) {
  const inventoryDir = path.join("./public", "components-inventory");

  try {
    // Создаем директорию для инвентаря
    await fs.mkdir(inventoryDir, { recursive: true });

    console.log(`📂 Сканирование: ${rootDir}`);
    console.log(`📁 Результаты сохранятся в: ${inventoryDir}\n`);

    // Получаем список всех компонентов
    const entries = await fs.readdir(rootDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        await processComponent(
          path.join(rootDir, entry.name),
          entry.name,
          inventoryDir
        );
      }
    }

    console.log("\n✅ Сканирование завершено!");
  } catch (error) {
    console.error("❌ Ошибка:", error.message);
  }
}

/**
 * Обрабатывает отдельный компонент
 */
async function processComponent(componentPath, componentName, inventoryDir) {
  try {
    const componentInventoryDir = path.join(inventoryDir, componentName);
    await fs.mkdir(componentInventoryDir, { recursive: true });

    const files = await fs.readdir(componentPath, { withFileTypes: true });
    const fileList = [];

    // Обрабатываем каждый файл в компоненте
    for (const file of files) {
      if (file.isFile()) {
        fileList.push(file.name);

        // Создаем TXT файл с исходным кодом
        const filePath = path.join(componentPath, file.name);
        const fileContent = await fs.readFile(filePath, "utf-8");

        const txtFileName = `${file.name}.txt`;
        const txtPath = path.join(componentInventoryDir, txtFileName);

        const txtContent = `=== ${componentName}/${file.name} ===\n\n${fileContent}`;

        await fs.writeFile(txtPath, txtContent, "utf-8");
      }
    }

    // Создаем JSON файл с метаинформацией
    const jsonData = {
      name: componentName,
      files: fileList,
      createdAt: new Date().toISOString(),
      fileCount: fileList.length,
    };

    const jsonPath = path.join(componentInventoryDir, "meta.json");
    await fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), "utf-8");

    console.log(`✓ ${componentName}`);
    console.log(`  📄 Файлов: ${fileList.length}`);
    console.log(`  📝 Создано: ${fileList.length} TXT + 1 JSON`);
  } catch (error) {
    console.error(`✗ Ошибка обработки ${componentName}:`, error.message);
  }
}

// Получаем путь из аргументов или используем значение по умолчанию
const componentDir = process.argv[2] || "./src/experiments";

scanComponents(componentDir);
