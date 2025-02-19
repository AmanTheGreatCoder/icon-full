module.exports = {
  apps: [
    {
      name: "ionic-ui",
      script: "npm",
      args: "run start",
      cwd: "./",
      watch: ["server", "client"],
      ignore_watch: ["node_modules", ".next", "*.log"],
      env: {
        NODE_ENV: "development",
        PORT: 8090,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8090,
      },
      instances: "1",
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
