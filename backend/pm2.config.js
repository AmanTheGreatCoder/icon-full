module.exports = {
  apps: [
    {
      name: 'iconic-backend',
      script: 'dist/src/main.js',
      instances: '1',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 9090,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 9090,
      },
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_file: 'logs/combined.log',
      time: true,
    },
  ],
};
