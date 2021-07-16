module.exports = {
    devServer: {
      public: process.env.NODE_ENV == 'production' ? 'emrecanminnet.me' : 'localhost'
    }
  };