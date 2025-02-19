module.exports = {
  apps: [
    {
      name: "iconic-admin",
      script: "npm",
      args: "run start",
      cwd: "./",
      watch: ["server", "client"],
      ignore_watch: ["node_modules", ".next", "*.log"],
      env: {
        NODE_ENV: "development",
        PORT: 8070,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8070,
      },
      instances: "1",
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
