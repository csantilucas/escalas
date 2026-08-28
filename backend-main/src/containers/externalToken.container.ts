import { ExternalTokenRepository } from "../app/repository/tokenRepo.js";
import { ExternalTokenService } from "../app/services/tokenService.js";

const externalTokenRepo = new ExternalTokenRepository();
const externalTokenService = new ExternalTokenService(externalTokenRepo);

export { externalTokenRepo, externalTokenService };
