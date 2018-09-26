const secrets = {
  dbUri: "mongodb://localhost:27017/macca"
};

export const getSecret = key => secrets[key];