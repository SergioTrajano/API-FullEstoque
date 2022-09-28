import dotenv from "dotenv";
import server from "./server";

dotenv.config();

const PORT: Number = Number(process.env.PORT) || 5000;

server.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
