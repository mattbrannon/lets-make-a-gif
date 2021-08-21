module.exports = {
  apps: [
    {
      script: 'server/index.js',
      watch: true,
      ignore_watch: [ 'node_modules' ],
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    development: {
      user: 'gizmo',
      host: '161.35.131.122',
      ref: 'origin/dev',
      repo: 'git@github.com:mattbrannon/lets-make-a-gif.git',
      path: '/var/www/lets-make-a-gif.com/',
      ssh_options: 'IdentityFile=~/.ssh/mattbrannon',
      'pre-deploy-local': '',
      'post-deploy': 'yarn build && pm2 reload server/index.js --watch',
    },
    production: {
      user: 'gizmo',
      host: '161.35.131.122',
      ref: 'origin/dev',
      repo: 'git@github.com:mattbrannon/lets-make-a-gif.git',
      path: '/var/www/lets-make-a-gif.com/',
      ssh_options: 'IdentityFile=~/.ssh/mattbrannon',
      // 'post-deploy': 'yarn build && pm2 reload server/index.js --watch',
      'post-deploy':
        'yarn install && yarn build && pm2 reload ecosystem.config.js --env production && pm2 save',
    },
  },
};
