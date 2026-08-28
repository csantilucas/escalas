import { UserService } from "../app/services/userService.js";
import { UserRepository } from "../app/repository/userRepo.js";

export const userRepo = new UserRepository();
export const userRepository = userRepo;
export const userService = new UserService(userRepository);