import app from "./app";
import seedSuperAdmin from "./app/utils/seed";
import envConfig from "./config/env";

const bootstrap = async () => {
  try {
    await seedSuperAdmin();
    app.listen(envConfig.PORT, () => {
      console.log(`server is running on the ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
bootstrap();
