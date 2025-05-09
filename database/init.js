const { testConnection, initializeDatabase } = require('./db');

async function initialize() {
  const isConnected = await testConnection();
  
  if (isConnected) {
    await initializeDatabase();
  } else {
    console.error('Cannot initialize database: connection failed');
    process.exit(1);
  }
}

initialize().catch(console.error);