import app from "./app";
import envConfig from "./config/env";

const bootstrap = () => {
  try {
    app.listen(envConfig.PORT, () => {
      console.log(`server is running on the ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
bootstrap();
