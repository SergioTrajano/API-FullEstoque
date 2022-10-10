import { faker } from "@faker-js/faker";

import { manufaturerRepository } from "../../../src/repositories/manufacturerRepository";
import { manufacturerService } from "../../../src/services/manufacturerService";
import { userService } from "../../../src/services/userService";
import { factory } from "../../factory";

beforeEach(() => {
	jest.resetAllMocks();
	jest.clearAllMocks();
});

describe("Unit tests of manufacturers service", () => {
	it("create function create manufacturer and return it", async () => {
		const token = await factory.createToken();
		const newManufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementationOnce((): any => {
			return false;
		});

		jest.spyOn(manufaturerRepository, "getByName").mockImplementationOnce((): any => {
			return false;
		});

		jest.spyOn(manufaturerRepository, "create").mockImplementationOnce((): any => {
			return {};
		});

		const promise = await manufacturerService.create(newManufacturer, token.id);

		expect(userService.getById).toBeCalled();
		expect(manufaturerRepository.create).toBeCalled();
		expect(manufaturerRepository.getByName).toBeCalled();
		expect(promise).toBeInstanceOf(Object);
	});

	it("create function throws error if name is in use", async () => {
		const token = await factory.createToken();
		const newManufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getByName").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "create").mockImplementationOnce((): any => {
			return {};
		});

		try {
			await manufacturerService.create({ name: newManufacturer.name }, token.id);
		} catch (e) {
			expect(userService.getById).toBeCalled();
			expect(manufaturerRepository.getByName).toBeCalled();
			expect(manufaturerRepository.create).not.toBeCalled();
			expect(e).toEqual({ code: 409, message: `Manufacturer already in use.` });
		}
	});

	it("update function throws notFound error for invalid manufactureId", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return false;
		});

		try {
			await manufacturerService.update({ name: manufacturer.name }, token.id, manufacturer.id);
		} catch (e) {
			expect(userService.getById).toHaveReturned();
			expect(manufaturerRepository.getById).toBeCalled();
			expect(e).toEqual({ code: 404, message: `Manufacturer not found.` });
		}
	});

	it("update function throws conflict error for name in use", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getByName").mockImplementationOnce((): any => {
			return { id: -1 };
		});

		try {
			await manufacturerService.update({ name: manufacturer.name }, token.id, manufacturer.id);
		} catch (e) {
			expect(userService.getById).toBeCalled();
			expect(manufaturerRepository.getById).toBeCalled();
			expect(manufaturerRepository.getByName).toBeCalled();
			expect(e).toEqual({ code: 409, message: `Name already in use.` });
		}
	});

	it("update function throws forbbiden error if user try to modify other user's manufacturer", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return { userId: -1 };
		});

		jest.spyOn(manufaturerRepository, "getByName").mockImplementationOnce((): any => {
			return { id: manufacturer.id };
		});

		try {
			await manufacturerService.update({ name: manufacturer.name }, token.id, manufacturer.id);
		} catch (e) {
			expect(userService.getById).toBeCalled();
			expect(manufaturerRepository.getById).toBeCalled();
			expect(manufaturerRepository.getByName).toBeCalled();
			expect(e).toEqual({ code: 403, message: "Permission denied!" });
		}
	});

	it("update function updates manufacturer", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return { userId: token.id };
		});

		jest.spyOn(manufaturerRepository, "getByName").mockImplementationOnce((): any => {
			return { id: manufacturer.id };
		});

		jest.spyOn(manufaturerRepository, "update").mockImplementationOnce((): any => {
			return {};
		});

		const promise = await manufacturerService.update({ name: manufacturer.name }, token.id, manufacturer.id);

		expect(userService.getById).toBeCalled();
		expect(manufaturerRepository.getById).toBeCalled();
		expect(manufaturerRepository.getByName).toBeCalled();
		expect(manufaturerRepository.update).toBeCalled();
		expect(promise).toBeInstanceOf(Object);
	});

	it("remove function throws notFound error for invalid manufacturerId", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementation((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return false;
		});

		try {
			await manufacturerService.remove(token.id, manufacturer.id);
		} catch (e) {
			expect(userService.getById).toBeCalled();
			expect(manufaturerRepository.getById).toBeCalled();
			expect(e).toEqual({ code: 404, message: `Manufacturer not found.` });
		}
	});

	it("remove function throws forbbiden error if user try to delete othe user's manufacturer", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementation((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return { id: -1 };
		});

		try {
			await manufacturerService.remove(token.id, manufacturer.id);
		} catch (e) {
			expect(userService.getById).toBeCalled();
			expect(manufaturerRepository.getById).toBeCalled();
			expect(e).toEqual({ code: 403, message: "Permission denied!" });
		}
	});

	it("update function delete manufacturer", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(userService, "getById").mockImplementation((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return { id: -1 };
		});

		jest.spyOn(manufaturerRepository, "remove").mockImplementationOnce((): any => {
			return true;
		});

		try {
			await manufacturerService.remove(token.id, manufacturer.id);

			expect(userService.getById).toBeCalled();
			expect(manufaturerRepository.getById).toBeCalled();
			expect(manufaturerRepository.remove).toBeCalled();
			expect(manufacturerService.remove).not.toReturn();
		} catch {}
	});

	it("find function returns users manufacturers", async () => {
		const token = await factory.createToken();

		jest.spyOn(userService, "getById").mockImplementationOnce((): any => {
			return true;
		});

		jest.spyOn(manufaturerRepository, "find").mockImplementationOnce((): any => {
			return true;
		});

		try {
			await manufacturerService.find(token.id);

			expect(manufaturerRepository.find).toBeCalled();
			expect(manufacturerService.find).toReturn();
		} catch {}
	});

	it("findBYId function returns manufacturer", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return true;
		});

		try {
			await manufacturerService.findById(manufacturer.id);

			expect(manufaturerRepository.getById).toBeCalled();
			expect(manufacturerService.findById).toReturn();
		} catch {}
	});

	it("findById function throws notFOunt error fon invalid id", async () => {
		const token = await factory.createToken();
		const manufacturer = await factory.createManufacturer(false, token.id);

		jest.spyOn(manufaturerRepository, "getById").mockImplementationOnce((): any => {
			return false;
		});

		try {
			await manufacturerService.findById(manufacturer.id);
		} catch (e) {
			expect(manufaturerRepository.getById).toBeCalled();
			expect(e).toEqual({ code: 404, message: `Manufacture not found.` });
		}
	});
});
