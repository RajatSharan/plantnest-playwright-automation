import fs from "fs"


function loadTestData(filePath: string): any {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Test data file not found: ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
}

export function getTestData(key: string, filePath: string): any {
    const testData = loadTestData(filePath);

    if (!(key in testData)) {
        throw new Error(`Key "${key}" not found in test data.`);
    }

     const value = testData[key];
      if (typeof value !== 'string') {
        throw new Error(`Value for key "${key}" is not a string.`);
    }

    return testData[key];
}

// Method to get JSON array
// It now accepts a filePath parameter
export function getJsonArray(key: string, filePath: string): any[] {
    const testData = loadTestData(filePath);

    if (!(key in testData)) {
        throw new Error(`Key "${key}" not found in test data`);
    }

    const value = testData[key];
    if (!Array.isArray(value)) {
        throw new Error(`Key "${key}" does not contain a JSON array`);
    }

    return value;
}

// Method to get JSON object
// It now accepts a filePath parameter
export function getJsonObject(key: string, filePath: string): Record<string, any> {
    const testData = loadTestData(filePath);

    if (!(key in testData)) {
        throw new Error(`Key "${key}" not found in test data`);
    }

    const value = testData[key];
    if (typeof value !== "object" || Array.isArray(value)) {
        throw new Error(`Key "${key}" does not contain a JSON object`);
    }

    return value;
}