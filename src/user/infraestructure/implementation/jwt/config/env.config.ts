const jwtEnvConfig = () => ({
  secret: process.env.JWT_SECRET,
});

export default jwtEnvConfig;
