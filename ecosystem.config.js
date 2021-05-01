module.exports = {
  apps: [
    {
      script: 'server/index.js',
      watch: true,
      ignore_watch: ['node_modules'],
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
      ref: 'origin/master',
      repo: 'git@github.com:ghostrib/lets-make-a-gif.git',
      path: '/var/www/lets-make-a-gif.com/',
      ssh_options: 'IdentityFile=~/.ssh/mattbrannon',
      'pre-deploy-local': '',
      'post-deploy':
        'npm run build && pm2 reload server/index.js --watch',
    },
  },
};
