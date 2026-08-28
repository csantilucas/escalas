
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Atendimento
 * 
 */
export type Atendimento = $Result.DefaultSelection<Prisma.$AtendimentoPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model EquipePlantao
 * 
 */
export type EquipePlantao = $Result.DefaultSelection<Prisma.$EquipePlantaoPayload>
/**
 * Model MembroEquipe
 * 
 */
export type MembroEquipe = $Result.DefaultSelection<Prisma.$MembroEquipePayload>
/**
 * Model Plantonistas
 * 
 */
export type Plantonistas = $Result.DefaultSelection<Prisma.$PlantonistasPayload>
/**
 * Model Registros
 * 
 */
export type Registros = $Result.DefaultSelection<Prisma.$RegistrosPayload>
/**
 * Model ExternalToken
 * 
 */
export type ExternalToken = $Result.DefaultSelection<Prisma.$ExternalTokenPayload>
/**
 * Model TomticketReportCache
 * 
 */
export type TomticketReportCache = $Result.DefaultSelection<Prisma.$TomticketReportCachePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const NivelAcesso: {
  admin: 'admin',
  comum: 'comum'
};

export type NivelAcesso = (typeof NivelAcesso)[keyof typeof NivelAcesso]


export const TipoUsuario: {
  atendente: 'atendente',
  comum: 'comum'
};

export type TipoUsuario = (typeof TipoUsuario)[keyof typeof TipoUsuario]

}

export type NivelAcesso = $Enums.NivelAcesso

export const NivelAcesso: typeof $Enums.NivelAcesso

export type TipoUsuario = $Enums.TipoUsuario

export const TipoUsuario: typeof $Enums.TipoUsuario

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Atendimentos
 * const atendimentos = await prisma.atendimento.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Atendimentos
   * const atendimentos = await prisma.atendimento.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.atendimento`: Exposes CRUD operations for the **Atendimento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Atendimentos
    * const atendimentos = await prisma.atendimento.findMany()
    * ```
    */
  get atendimento(): Prisma.AtendimentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.equipePlantao`: Exposes CRUD operations for the **EquipePlantao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EquipePlantaos
    * const equipePlantaos = await prisma.equipePlantao.findMany()
    * ```
    */
  get equipePlantao(): Prisma.EquipePlantaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.membroEquipe`: Exposes CRUD operations for the **MembroEquipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MembroEquipes
    * const membroEquipes = await prisma.membroEquipe.findMany()
    * ```
    */
  get membroEquipe(): Prisma.MembroEquipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plantonistas`: Exposes CRUD operations for the **Plantonistas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plantonistas
    * const plantonistas = await prisma.plantonistas.findMany()
    * ```
    */
  get plantonistas(): Prisma.PlantonistasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registros`: Exposes CRUD operations for the **Registros** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registros
    * const registros = await prisma.registros.findMany()
    * ```
    */
  get registros(): Prisma.RegistrosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.externalToken`: Exposes CRUD operations for the **ExternalToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExternalTokens
    * const externalTokens = await prisma.externalToken.findMany()
    * ```
    */
  get externalToken(): Prisma.ExternalTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tomticketReportCache`: Exposes CRUD operations for the **TomticketReportCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TomticketReportCaches
    * const tomticketReportCaches = await prisma.tomticketReportCache.findMany()
    * ```
    */
  get tomticketReportCache(): Prisma.TomticketReportCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Atendimento: 'Atendimento',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    EquipePlantao: 'EquipePlantao',
    MembroEquipe: 'MembroEquipe',
    Plantonistas: 'Plantonistas',
    Registros: 'Registros',
    ExternalToken: 'ExternalToken',
    TomticketReportCache: 'TomticketReportCache',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "atendimento" | "session" | "account" | "verification" | "equipePlantao" | "membroEquipe" | "plantonistas" | "registros" | "externalToken" | "tomticketReportCache" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Atendimento: {
        payload: Prisma.$AtendimentoPayload<ExtArgs>
        fields: Prisma.AtendimentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AtendimentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AtendimentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          findFirst: {
            args: Prisma.AtendimentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AtendimentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          findMany: {
            args: Prisma.AtendimentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>[]
          }
          create: {
            args: Prisma.AtendimentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          createMany: {
            args: Prisma.AtendimentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AtendimentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>[]
          }
          delete: {
            args: Prisma.AtendimentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          update: {
            args: Prisma.AtendimentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          deleteMany: {
            args: Prisma.AtendimentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AtendimentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AtendimentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>[]
          }
          upsert: {
            args: Prisma.AtendimentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AtendimentoPayload>
          }
          aggregate: {
            args: Prisma.AtendimentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAtendimento>
          }
          groupBy: {
            args: Prisma.AtendimentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AtendimentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AtendimentoCountArgs<ExtArgs>
            result: $Utils.Optional<AtendimentoCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      EquipePlantao: {
        payload: Prisma.$EquipePlantaoPayload<ExtArgs>
        fields: Prisma.EquipePlantaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EquipePlantaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EquipePlantaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>
          }
          findFirst: {
            args: Prisma.EquipePlantaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EquipePlantaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>
          }
          findMany: {
            args: Prisma.EquipePlantaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>[]
          }
          create: {
            args: Prisma.EquipePlantaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>
          }
          createMany: {
            args: Prisma.EquipePlantaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EquipePlantaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>[]
          }
          delete: {
            args: Prisma.EquipePlantaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>
          }
          update: {
            args: Prisma.EquipePlantaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>
          }
          deleteMany: {
            args: Prisma.EquipePlantaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EquipePlantaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EquipePlantaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>[]
          }
          upsert: {
            args: Prisma.EquipePlantaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipePlantaoPayload>
          }
          aggregate: {
            args: Prisma.EquipePlantaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEquipePlantao>
          }
          groupBy: {
            args: Prisma.EquipePlantaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EquipePlantaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.EquipePlantaoCountArgs<ExtArgs>
            result: $Utils.Optional<EquipePlantaoCountAggregateOutputType> | number
          }
        }
      }
      MembroEquipe: {
        payload: Prisma.$MembroEquipePayload<ExtArgs>
        fields: Prisma.MembroEquipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MembroEquipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MembroEquipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>
          }
          findFirst: {
            args: Prisma.MembroEquipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MembroEquipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>
          }
          findMany: {
            args: Prisma.MembroEquipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>[]
          }
          create: {
            args: Prisma.MembroEquipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>
          }
          createMany: {
            args: Prisma.MembroEquipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MembroEquipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>[]
          }
          delete: {
            args: Prisma.MembroEquipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>
          }
          update: {
            args: Prisma.MembroEquipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>
          }
          deleteMany: {
            args: Prisma.MembroEquipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MembroEquipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MembroEquipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>[]
          }
          upsert: {
            args: Prisma.MembroEquipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembroEquipePayload>
          }
          aggregate: {
            args: Prisma.MembroEquipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembroEquipe>
          }
          groupBy: {
            args: Prisma.MembroEquipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MembroEquipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MembroEquipeCountArgs<ExtArgs>
            result: $Utils.Optional<MembroEquipeCountAggregateOutputType> | number
          }
        }
      }
      Plantonistas: {
        payload: Prisma.$PlantonistasPayload<ExtArgs>
        fields: Prisma.PlantonistasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlantonistasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlantonistasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>
          }
          findFirst: {
            args: Prisma.PlantonistasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlantonistasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>
          }
          findMany: {
            args: Prisma.PlantonistasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>[]
          }
          create: {
            args: Prisma.PlantonistasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>
          }
          createMany: {
            args: Prisma.PlantonistasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlantonistasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>[]
          }
          delete: {
            args: Prisma.PlantonistasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>
          }
          update: {
            args: Prisma.PlantonistasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>
          }
          deleteMany: {
            args: Prisma.PlantonistasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlantonistasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlantonistasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>[]
          }
          upsert: {
            args: Prisma.PlantonistasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlantonistasPayload>
          }
          aggregate: {
            args: Prisma.PlantonistasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlantonistas>
          }
          groupBy: {
            args: Prisma.PlantonistasGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlantonistasGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlantonistasCountArgs<ExtArgs>
            result: $Utils.Optional<PlantonistasCountAggregateOutputType> | number
          }
        }
      }
      Registros: {
        payload: Prisma.$RegistrosPayload<ExtArgs>
        fields: Prisma.RegistrosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistrosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistrosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>
          }
          findFirst: {
            args: Prisma.RegistrosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistrosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>
          }
          findMany: {
            args: Prisma.RegistrosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>[]
          }
          create: {
            args: Prisma.RegistrosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>
          }
          createMany: {
            args: Prisma.RegistrosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistrosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>[]
          }
          delete: {
            args: Prisma.RegistrosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>
          }
          update: {
            args: Prisma.RegistrosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>
          }
          deleteMany: {
            args: Prisma.RegistrosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistrosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistrosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>[]
          }
          upsert: {
            args: Prisma.RegistrosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrosPayload>
          }
          aggregate: {
            args: Prisma.RegistrosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistros>
          }
          groupBy: {
            args: Prisma.RegistrosGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrosGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistrosCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrosCountAggregateOutputType> | number
          }
        }
      }
      ExternalToken: {
        payload: Prisma.$ExternalTokenPayload<ExtArgs>
        fields: Prisma.ExternalTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExternalTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExternalTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>
          }
          findFirst: {
            args: Prisma.ExternalTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExternalTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>
          }
          findMany: {
            args: Prisma.ExternalTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>[]
          }
          create: {
            args: Prisma.ExternalTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>
          }
          createMany: {
            args: Prisma.ExternalTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExternalTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>[]
          }
          delete: {
            args: Prisma.ExternalTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>
          }
          update: {
            args: Prisma.ExternalTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>
          }
          deleteMany: {
            args: Prisma.ExternalTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExternalTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExternalTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>[]
          }
          upsert: {
            args: Prisma.ExternalTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalTokenPayload>
          }
          aggregate: {
            args: Prisma.ExternalTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExternalToken>
          }
          groupBy: {
            args: Prisma.ExternalTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExternalTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExternalTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ExternalTokenCountAggregateOutputType> | number
          }
        }
      }
      TomticketReportCache: {
        payload: Prisma.$TomticketReportCachePayload<ExtArgs>
        fields: Prisma.TomticketReportCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TomticketReportCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TomticketReportCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>
          }
          findFirst: {
            args: Prisma.TomticketReportCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TomticketReportCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>
          }
          findMany: {
            args: Prisma.TomticketReportCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>[]
          }
          create: {
            args: Prisma.TomticketReportCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>
          }
          createMany: {
            args: Prisma.TomticketReportCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TomticketReportCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>[]
          }
          delete: {
            args: Prisma.TomticketReportCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>
          }
          update: {
            args: Prisma.TomticketReportCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>
          }
          deleteMany: {
            args: Prisma.TomticketReportCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TomticketReportCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TomticketReportCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>[]
          }
          upsert: {
            args: Prisma.TomticketReportCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TomticketReportCachePayload>
          }
          aggregate: {
            args: Prisma.TomticketReportCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTomticketReportCache>
          }
          groupBy: {
            args: Prisma.TomticketReportCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<TomticketReportCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.TomticketReportCacheCountArgs<ExtArgs>
            result: $Utils.Optional<TomticketReportCacheCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    atendimento?: AtendimentoOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    equipePlantao?: EquipePlantaoOmit
    membroEquipe?: MembroEquipeOmit
    plantonistas?: PlantonistasOmit
    registros?: RegistrosOmit
    externalToken?: ExternalTokenOmit
    tomticketReportCache?: TomticketReportCacheOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EquipePlantaoCountOutputType
   */

  export type EquipePlantaoCountOutputType = {
    membros: number
  }

  export type EquipePlantaoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    membros?: boolean | EquipePlantaoCountOutputTypeCountMembrosArgs
  }

  // Custom InputTypes
  /**
   * EquipePlantaoCountOutputType without action
   */
  export type EquipePlantaoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantaoCountOutputType
     */
    select?: EquipePlantaoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EquipePlantaoCountOutputType without action
   */
  export type EquipePlantaoCountOutputTypeCountMembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembroEquipeWhereInput
  }


  /**
   * Count Type PlantonistasCountOutputType
   */

  export type PlantonistasCountOutputType = {
    registros: number
  }

  export type PlantonistasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registros?: boolean | PlantonistasCountOutputTypeCountRegistrosArgs
  }

  // Custom InputTypes
  /**
   * PlantonistasCountOutputType without action
   */
  export type PlantonistasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlantonistasCountOutputType
     */
    select?: PlantonistasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlantonistasCountOutputType without action
   */
  export type PlantonistasCountOutputTypeCountRegistrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrosWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    registros: number
    membrosEquipe: number
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registros?: boolean | UserCountOutputTypeCountRegistrosArgs
    membrosEquipe?: boolean | UserCountOutputTypeCountMembrosEquipeArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRegistrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrosWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembrosEquipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembroEquipeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Atendimento
   */

  export type AggregateAtendimento = {
    _count: AtendimentoCountAggregateOutputType | null
    _min: AtendimentoMinAggregateOutputType | null
    _max: AtendimentoMaxAggregateOutputType | null
  }

  export type AtendimentoMinAggregateOutputType = {
    id: string | null
    ticketZpro: string | null
    ticketTomticket: string | null
    sincronizado: boolean | null
    clienteId: string | null
    cnpj: string | null
    atendente: string | null
    protocolo: string | null
    nomeContato: string | null
    tipoAtendimento: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AtendimentoMaxAggregateOutputType = {
    id: string | null
    ticketZpro: string | null
    ticketTomticket: string | null
    sincronizado: boolean | null
    clienteId: string | null
    cnpj: string | null
    atendente: string | null
    protocolo: string | null
    nomeContato: string | null
    tipoAtendimento: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AtendimentoCountAggregateOutputType = {
    id: number
    ticketZpro: number
    ticketTomticket: number
    sincronizado: number
    clienteId: number
    cnpj: number
    atendente: number
    protocolo: number
    nomeContato: number
    tipoAtendimento: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AtendimentoMinAggregateInputType = {
    id?: true
    ticketZpro?: true
    ticketTomticket?: true
    sincronizado?: true
    clienteId?: true
    cnpj?: true
    atendente?: true
    protocolo?: true
    nomeContato?: true
    tipoAtendimento?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AtendimentoMaxAggregateInputType = {
    id?: true
    ticketZpro?: true
    ticketTomticket?: true
    sincronizado?: true
    clienteId?: true
    cnpj?: true
    atendente?: true
    protocolo?: true
    nomeContato?: true
    tipoAtendimento?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AtendimentoCountAggregateInputType = {
    id?: true
    ticketZpro?: true
    ticketTomticket?: true
    sincronizado?: true
    clienteId?: true
    cnpj?: true
    atendente?: true
    protocolo?: true
    nomeContato?: true
    tipoAtendimento?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AtendimentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Atendimento to aggregate.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Atendimentos
    **/
    _count?: true | AtendimentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AtendimentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AtendimentoMaxAggregateInputType
  }

  export type GetAtendimentoAggregateType<T extends AtendimentoAggregateArgs> = {
        [P in keyof T & keyof AggregateAtendimento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAtendimento[P]>
      : GetScalarType<T[P], AggregateAtendimento[P]>
  }




  export type AtendimentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AtendimentoWhereInput
    orderBy?: AtendimentoOrderByWithAggregationInput | AtendimentoOrderByWithAggregationInput[]
    by: AtendimentoScalarFieldEnum[] | AtendimentoScalarFieldEnum
    having?: AtendimentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AtendimentoCountAggregateInputType | true
    _min?: AtendimentoMinAggregateInputType
    _max?: AtendimentoMaxAggregateInputType
  }

  export type AtendimentoGroupByOutputType = {
    id: string
    ticketZpro: string | null
    ticketTomticket: string | null
    sincronizado: boolean
    clienteId: string | null
    cnpj: string | null
    atendente: string | null
    protocolo: string | null
    nomeContato: string | null
    tipoAtendimento: string | null
    createdAt: Date
    updatedAt: Date
    _count: AtendimentoCountAggregateOutputType | null
    _min: AtendimentoMinAggregateOutputType | null
    _max: AtendimentoMaxAggregateOutputType | null
  }

  type GetAtendimentoGroupByPayload<T extends AtendimentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AtendimentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AtendimentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AtendimentoGroupByOutputType[P]>
            : GetScalarType<T[P], AtendimentoGroupByOutputType[P]>
        }
      >
    >


  export type AtendimentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketZpro?: boolean
    ticketTomticket?: boolean
    sincronizado?: boolean
    clienteId?: boolean
    cnpj?: boolean
    atendente?: boolean
    protocolo?: boolean
    nomeContato?: boolean
    tipoAtendimento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["atendimento"]>

  export type AtendimentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketZpro?: boolean
    ticketTomticket?: boolean
    sincronizado?: boolean
    clienteId?: boolean
    cnpj?: boolean
    atendente?: boolean
    protocolo?: boolean
    nomeContato?: boolean
    tipoAtendimento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["atendimento"]>

  export type AtendimentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketZpro?: boolean
    ticketTomticket?: boolean
    sincronizado?: boolean
    clienteId?: boolean
    cnpj?: boolean
    atendente?: boolean
    protocolo?: boolean
    nomeContato?: boolean
    tipoAtendimento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["atendimento"]>

  export type AtendimentoSelectScalar = {
    id?: boolean
    ticketZpro?: boolean
    ticketTomticket?: boolean
    sincronizado?: boolean
    clienteId?: boolean
    cnpj?: boolean
    atendente?: boolean
    protocolo?: boolean
    nomeContato?: boolean
    tipoAtendimento?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AtendimentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketZpro" | "ticketTomticket" | "sincronizado" | "clienteId" | "cnpj" | "atendente" | "protocolo" | "nomeContato" | "tipoAtendimento" | "createdAt" | "updatedAt", ExtArgs["result"]["atendimento"]>

  export type $AtendimentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Atendimento"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ticketZpro: string | null
      ticketTomticket: string | null
      sincronizado: boolean
      clienteId: string | null
      cnpj: string | null
      atendente: string | null
      protocolo: string | null
      nomeContato: string | null
      tipoAtendimento: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["atendimento"]>
    composites: {}
  }

  type AtendimentoGetPayload<S extends boolean | null | undefined | AtendimentoDefaultArgs> = $Result.GetResult<Prisma.$AtendimentoPayload, S>

  type AtendimentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AtendimentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AtendimentoCountAggregateInputType | true
    }

  export interface AtendimentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Atendimento'], meta: { name: 'Atendimento' } }
    /**
     * Find zero or one Atendimento that matches the filter.
     * @param {AtendimentoFindUniqueArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AtendimentoFindUniqueArgs>(args: SelectSubset<T, AtendimentoFindUniqueArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Atendimento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AtendimentoFindUniqueOrThrowArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AtendimentoFindUniqueOrThrowArgs>(args: SelectSubset<T, AtendimentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Atendimento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoFindFirstArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AtendimentoFindFirstArgs>(args?: SelectSubset<T, AtendimentoFindFirstArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Atendimento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoFindFirstOrThrowArgs} args - Arguments to find a Atendimento
     * @example
     * // Get one Atendimento
     * const atendimento = await prisma.atendimento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AtendimentoFindFirstOrThrowArgs>(args?: SelectSubset<T, AtendimentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Atendimentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Atendimentos
     * const atendimentos = await prisma.atendimento.findMany()
     * 
     * // Get first 10 Atendimentos
     * const atendimentos = await prisma.atendimento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const atendimentoWithIdOnly = await prisma.atendimento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AtendimentoFindManyArgs>(args?: SelectSubset<T, AtendimentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Atendimento.
     * @param {AtendimentoCreateArgs} args - Arguments to create a Atendimento.
     * @example
     * // Create one Atendimento
     * const Atendimento = await prisma.atendimento.create({
     *   data: {
     *     // ... data to create a Atendimento
     *   }
     * })
     * 
     */
    create<T extends AtendimentoCreateArgs>(args: SelectSubset<T, AtendimentoCreateArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Atendimentos.
     * @param {AtendimentoCreateManyArgs} args - Arguments to create many Atendimentos.
     * @example
     * // Create many Atendimentos
     * const atendimento = await prisma.atendimento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AtendimentoCreateManyArgs>(args?: SelectSubset<T, AtendimentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Atendimentos and returns the data saved in the database.
     * @param {AtendimentoCreateManyAndReturnArgs} args - Arguments to create many Atendimentos.
     * @example
     * // Create many Atendimentos
     * const atendimento = await prisma.atendimento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Atendimentos and only return the `id`
     * const atendimentoWithIdOnly = await prisma.atendimento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AtendimentoCreateManyAndReturnArgs>(args?: SelectSubset<T, AtendimentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Atendimento.
     * @param {AtendimentoDeleteArgs} args - Arguments to delete one Atendimento.
     * @example
     * // Delete one Atendimento
     * const Atendimento = await prisma.atendimento.delete({
     *   where: {
     *     // ... filter to delete one Atendimento
     *   }
     * })
     * 
     */
    delete<T extends AtendimentoDeleteArgs>(args: SelectSubset<T, AtendimentoDeleteArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Atendimento.
     * @param {AtendimentoUpdateArgs} args - Arguments to update one Atendimento.
     * @example
     * // Update one Atendimento
     * const atendimento = await prisma.atendimento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AtendimentoUpdateArgs>(args: SelectSubset<T, AtendimentoUpdateArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Atendimentos.
     * @param {AtendimentoDeleteManyArgs} args - Arguments to filter Atendimentos to delete.
     * @example
     * // Delete a few Atendimentos
     * const { count } = await prisma.atendimento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AtendimentoDeleteManyArgs>(args?: SelectSubset<T, AtendimentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Atendimentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Atendimentos
     * const atendimento = await prisma.atendimento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AtendimentoUpdateManyArgs>(args: SelectSubset<T, AtendimentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Atendimentos and returns the data updated in the database.
     * @param {AtendimentoUpdateManyAndReturnArgs} args - Arguments to update many Atendimentos.
     * @example
     * // Update many Atendimentos
     * const atendimento = await prisma.atendimento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Atendimentos and only return the `id`
     * const atendimentoWithIdOnly = await prisma.atendimento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AtendimentoUpdateManyAndReturnArgs>(args: SelectSubset<T, AtendimentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Atendimento.
     * @param {AtendimentoUpsertArgs} args - Arguments to update or create a Atendimento.
     * @example
     * // Update or create a Atendimento
     * const atendimento = await prisma.atendimento.upsert({
     *   create: {
     *     // ... data to create a Atendimento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Atendimento we want to update
     *   }
     * })
     */
    upsert<T extends AtendimentoUpsertArgs>(args: SelectSubset<T, AtendimentoUpsertArgs<ExtArgs>>): Prisma__AtendimentoClient<$Result.GetResult<Prisma.$AtendimentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Atendimentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoCountArgs} args - Arguments to filter Atendimentos to count.
     * @example
     * // Count the number of Atendimentos
     * const count = await prisma.atendimento.count({
     *   where: {
     *     // ... the filter for the Atendimentos we want to count
     *   }
     * })
    **/
    count<T extends AtendimentoCountArgs>(
      args?: Subset<T, AtendimentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AtendimentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Atendimento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AtendimentoAggregateArgs>(args: Subset<T, AtendimentoAggregateArgs>): Prisma.PrismaPromise<GetAtendimentoAggregateType<T>>

    /**
     * Group by Atendimento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AtendimentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AtendimentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AtendimentoGroupByArgs['orderBy'] }
        : { orderBy?: AtendimentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AtendimentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAtendimentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Atendimento model
   */
  readonly fields: AtendimentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Atendimento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AtendimentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Atendimento model
   */
  interface AtendimentoFieldRefs {
    readonly id: FieldRef<"Atendimento", 'String'>
    readonly ticketZpro: FieldRef<"Atendimento", 'String'>
    readonly ticketTomticket: FieldRef<"Atendimento", 'String'>
    readonly sincronizado: FieldRef<"Atendimento", 'Boolean'>
    readonly clienteId: FieldRef<"Atendimento", 'String'>
    readonly cnpj: FieldRef<"Atendimento", 'String'>
    readonly atendente: FieldRef<"Atendimento", 'String'>
    readonly protocolo: FieldRef<"Atendimento", 'String'>
    readonly nomeContato: FieldRef<"Atendimento", 'String'>
    readonly tipoAtendimento: FieldRef<"Atendimento", 'String'>
    readonly createdAt: FieldRef<"Atendimento", 'DateTime'>
    readonly updatedAt: FieldRef<"Atendimento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Atendimento findUnique
   */
  export type AtendimentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento findUniqueOrThrow
   */
  export type AtendimentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento findFirst
   */
  export type AtendimentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Atendimentos.
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Atendimentos.
     */
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Atendimento findFirstOrThrow
   */
  export type AtendimentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Filter, which Atendimento to fetch.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Atendimentos.
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Atendimentos.
     */
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Atendimento findMany
   */
  export type AtendimentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Filter, which Atendimentos to fetch.
     */
    where?: AtendimentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Atendimentos to fetch.
     */
    orderBy?: AtendimentoOrderByWithRelationInput | AtendimentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Atendimentos.
     */
    cursor?: AtendimentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Atendimentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Atendimentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Atendimentos.
     */
    distinct?: AtendimentoScalarFieldEnum | AtendimentoScalarFieldEnum[]
  }

  /**
   * Atendimento create
   */
  export type AtendimentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * The data needed to create a Atendimento.
     */
    data: XOR<AtendimentoCreateInput, AtendimentoUncheckedCreateInput>
  }

  /**
   * Atendimento createMany
   */
  export type AtendimentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Atendimentos.
     */
    data: AtendimentoCreateManyInput | AtendimentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Atendimento createManyAndReturn
   */
  export type AtendimentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * The data used to create many Atendimentos.
     */
    data: AtendimentoCreateManyInput | AtendimentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Atendimento update
   */
  export type AtendimentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * The data needed to update a Atendimento.
     */
    data: XOR<AtendimentoUpdateInput, AtendimentoUncheckedUpdateInput>
    /**
     * Choose, which Atendimento to update.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento updateMany
   */
  export type AtendimentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Atendimentos.
     */
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyInput>
    /**
     * Filter which Atendimentos to update
     */
    where?: AtendimentoWhereInput
    /**
     * Limit how many Atendimentos to update.
     */
    limit?: number
  }

  /**
   * Atendimento updateManyAndReturn
   */
  export type AtendimentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * The data used to update Atendimentos.
     */
    data: XOR<AtendimentoUpdateManyMutationInput, AtendimentoUncheckedUpdateManyInput>
    /**
     * Filter which Atendimentos to update
     */
    where?: AtendimentoWhereInput
    /**
     * Limit how many Atendimentos to update.
     */
    limit?: number
  }

  /**
   * Atendimento upsert
   */
  export type AtendimentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * The filter to search for the Atendimento to update in case it exists.
     */
    where: AtendimentoWhereUniqueInput
    /**
     * In case the Atendimento found by the `where` argument doesn't exist, create a new Atendimento with this data.
     */
    create: XOR<AtendimentoCreateInput, AtendimentoUncheckedCreateInput>
    /**
     * In case the Atendimento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AtendimentoUpdateInput, AtendimentoUncheckedUpdateInput>
  }

  /**
   * Atendimento delete
   */
  export type AtendimentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
    /**
     * Filter which Atendimento to delete.
     */
    where: AtendimentoWhereUniqueInput
  }

  /**
   * Atendimento deleteMany
   */
  export type AtendimentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Atendimentos to delete
     */
    where?: AtendimentoWhereInput
    /**
     * Limit how many Atendimentos to delete.
     */
    limit?: number
  }

  /**
   * Atendimento without action
   */
  export type AtendimentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Atendimento
     */
    select?: AtendimentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Atendimento
     */
    omit?: AtendimentoOmit<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    issuer: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    issuer: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    issuer: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    issuer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    issuer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    issuer?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    issuer: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    issuer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    issuer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    issuer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    issuer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "issuer" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      issuer: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly issuer: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model EquipePlantao
   */

  export type AggregateEquipePlantao = {
    _count: EquipePlantaoCountAggregateOutputType | null
    _avg: EquipePlantaoAvgAggregateOutputType | null
    _sum: EquipePlantaoSumAggregateOutputType | null
    _min: EquipePlantaoMinAggregateOutputType | null
    _max: EquipePlantaoMaxAggregateOutputType | null
  }

  export type EquipePlantaoAvgAggregateOutputType = {
    queueId: number | null
  }

  export type EquipePlantaoSumAggregateOutputType = {
    queueId: number | null
  }

  export type EquipePlantaoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
    cor: string | null
    ativo: boolean | null
    queueId: number | null
    queueName: string | null
    isFallback: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipePlantaoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
    cor: string | null
    ativo: boolean | null
    queueId: number | null
    queueName: string | null
    isFallback: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipePlantaoCountAggregateOutputType = {
    id: number
    nome: number
    descricao: number
    cor: number
    ativo: number
    queueId: number
    queueName: number
    departamentos: number
    isFallback: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EquipePlantaoAvgAggregateInputType = {
    queueId?: true
  }

  export type EquipePlantaoSumAggregateInputType = {
    queueId?: true
  }

  export type EquipePlantaoMinAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    cor?: true
    ativo?: true
    queueId?: true
    queueName?: true
    isFallback?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipePlantaoMaxAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    cor?: true
    ativo?: true
    queueId?: true
    queueName?: true
    isFallback?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipePlantaoCountAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    cor?: true
    ativo?: true
    queueId?: true
    queueName?: true
    departamentos?: true
    isFallback?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EquipePlantaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EquipePlantao to aggregate.
     */
    where?: EquipePlantaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipePlantaos to fetch.
     */
    orderBy?: EquipePlantaoOrderByWithRelationInput | EquipePlantaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EquipePlantaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipePlantaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipePlantaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EquipePlantaos
    **/
    _count?: true | EquipePlantaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EquipePlantaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EquipePlantaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EquipePlantaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EquipePlantaoMaxAggregateInputType
  }

  export type GetEquipePlantaoAggregateType<T extends EquipePlantaoAggregateArgs> = {
        [P in keyof T & keyof AggregateEquipePlantao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEquipePlantao[P]>
      : GetScalarType<T[P], AggregateEquipePlantao[P]>
  }




  export type EquipePlantaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EquipePlantaoWhereInput
    orderBy?: EquipePlantaoOrderByWithAggregationInput | EquipePlantaoOrderByWithAggregationInput[]
    by: EquipePlantaoScalarFieldEnum[] | EquipePlantaoScalarFieldEnum
    having?: EquipePlantaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EquipePlantaoCountAggregateInputType | true
    _avg?: EquipePlantaoAvgAggregateInputType
    _sum?: EquipePlantaoSumAggregateInputType
    _min?: EquipePlantaoMinAggregateInputType
    _max?: EquipePlantaoMaxAggregateInputType
  }

  export type EquipePlantaoGroupByOutputType = {
    id: string
    nome: string
    descricao: string | null
    cor: string | null
    ativo: boolean
    queueId: number | null
    queueName: string | null
    departamentos: string[]
    isFallback: boolean
    createdAt: Date
    updatedAt: Date
    _count: EquipePlantaoCountAggregateOutputType | null
    _avg: EquipePlantaoAvgAggregateOutputType | null
    _sum: EquipePlantaoSumAggregateOutputType | null
    _min: EquipePlantaoMinAggregateOutputType | null
    _max: EquipePlantaoMaxAggregateOutputType | null
  }

  type GetEquipePlantaoGroupByPayload<T extends EquipePlantaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EquipePlantaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EquipePlantaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EquipePlantaoGroupByOutputType[P]>
            : GetScalarType<T[P], EquipePlantaoGroupByOutputType[P]>
        }
      >
    >


  export type EquipePlantaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    cor?: boolean
    ativo?: boolean
    queueId?: boolean
    queueName?: boolean
    departamentos?: boolean
    isFallback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    membros?: boolean | EquipePlantao$membrosArgs<ExtArgs>
    _count?: boolean | EquipePlantaoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipePlantao"]>

  export type EquipePlantaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    cor?: boolean
    ativo?: boolean
    queueId?: boolean
    queueName?: boolean
    departamentos?: boolean
    isFallback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["equipePlantao"]>

  export type EquipePlantaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    cor?: boolean
    ativo?: boolean
    queueId?: boolean
    queueName?: boolean
    departamentos?: boolean
    isFallback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["equipePlantao"]>

  export type EquipePlantaoSelectScalar = {
    id?: boolean
    nome?: boolean
    descricao?: boolean
    cor?: boolean
    ativo?: boolean
    queueId?: boolean
    queueName?: boolean
    departamentos?: boolean
    isFallback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EquipePlantaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "descricao" | "cor" | "ativo" | "queueId" | "queueName" | "departamentos" | "isFallback" | "createdAt" | "updatedAt", ExtArgs["result"]["equipePlantao"]>
  export type EquipePlantaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    membros?: boolean | EquipePlantao$membrosArgs<ExtArgs>
    _count?: boolean | EquipePlantaoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EquipePlantaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EquipePlantaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EquipePlantaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EquipePlantao"
    objects: {
      membros: Prisma.$MembroEquipePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      descricao: string | null
      cor: string | null
      ativo: boolean
      queueId: number | null
      queueName: string | null
      departamentos: string[]
      isFallback: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["equipePlantao"]>
    composites: {}
  }

  type EquipePlantaoGetPayload<S extends boolean | null | undefined | EquipePlantaoDefaultArgs> = $Result.GetResult<Prisma.$EquipePlantaoPayload, S>

  type EquipePlantaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EquipePlantaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EquipePlantaoCountAggregateInputType | true
    }

  export interface EquipePlantaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EquipePlantao'], meta: { name: 'EquipePlantao' } }
    /**
     * Find zero or one EquipePlantao that matches the filter.
     * @param {EquipePlantaoFindUniqueArgs} args - Arguments to find a EquipePlantao
     * @example
     * // Get one EquipePlantao
     * const equipePlantao = await prisma.equipePlantao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EquipePlantaoFindUniqueArgs>(args: SelectSubset<T, EquipePlantaoFindUniqueArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EquipePlantao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EquipePlantaoFindUniqueOrThrowArgs} args - Arguments to find a EquipePlantao
     * @example
     * // Get one EquipePlantao
     * const equipePlantao = await prisma.equipePlantao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EquipePlantaoFindUniqueOrThrowArgs>(args: SelectSubset<T, EquipePlantaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EquipePlantao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipePlantaoFindFirstArgs} args - Arguments to find a EquipePlantao
     * @example
     * // Get one EquipePlantao
     * const equipePlantao = await prisma.equipePlantao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EquipePlantaoFindFirstArgs>(args?: SelectSubset<T, EquipePlantaoFindFirstArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EquipePlantao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipePlantaoFindFirstOrThrowArgs} args - Arguments to find a EquipePlantao
     * @example
     * // Get one EquipePlantao
     * const equipePlantao = await prisma.equipePlantao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EquipePlantaoFindFirstOrThrowArgs>(args?: SelectSubset<T, EquipePlantaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EquipePlantaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipePlantaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EquipePlantaos
     * const equipePlantaos = await prisma.equipePlantao.findMany()
     * 
     * // Get first 10 EquipePlantaos
     * const equipePlantaos = await prisma.equipePlantao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const equipePlantaoWithIdOnly = await prisma.equipePlantao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EquipePlantaoFindManyArgs>(args?: SelectSubset<T, EquipePlantaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EquipePlantao.
     * @param {EquipePlantaoCreateArgs} args - Arguments to create a EquipePlantao.
     * @example
     * // Create one EquipePlantao
     * const EquipePlantao = await prisma.equipePlantao.create({
     *   data: {
     *     // ... data to create a EquipePlantao
     *   }
     * })
     * 
     */
    create<T extends EquipePlantaoCreateArgs>(args: SelectSubset<T, EquipePlantaoCreateArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EquipePlantaos.
     * @param {EquipePlantaoCreateManyArgs} args - Arguments to create many EquipePlantaos.
     * @example
     * // Create many EquipePlantaos
     * const equipePlantao = await prisma.equipePlantao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EquipePlantaoCreateManyArgs>(args?: SelectSubset<T, EquipePlantaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EquipePlantaos and returns the data saved in the database.
     * @param {EquipePlantaoCreateManyAndReturnArgs} args - Arguments to create many EquipePlantaos.
     * @example
     * // Create many EquipePlantaos
     * const equipePlantao = await prisma.equipePlantao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EquipePlantaos and only return the `id`
     * const equipePlantaoWithIdOnly = await prisma.equipePlantao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EquipePlantaoCreateManyAndReturnArgs>(args?: SelectSubset<T, EquipePlantaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EquipePlantao.
     * @param {EquipePlantaoDeleteArgs} args - Arguments to delete one EquipePlantao.
     * @example
     * // Delete one EquipePlantao
     * const EquipePlantao = await prisma.equipePlantao.delete({
     *   where: {
     *     // ... filter to delete one EquipePlantao
     *   }
     * })
     * 
     */
    delete<T extends EquipePlantaoDeleteArgs>(args: SelectSubset<T, EquipePlantaoDeleteArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EquipePlantao.
     * @param {EquipePlantaoUpdateArgs} args - Arguments to update one EquipePlantao.
     * @example
     * // Update one EquipePlantao
     * const equipePlantao = await prisma.equipePlantao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EquipePlantaoUpdateArgs>(args: SelectSubset<T, EquipePlantaoUpdateArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EquipePlantaos.
     * @param {EquipePlantaoDeleteManyArgs} args - Arguments to filter EquipePlantaos to delete.
     * @example
     * // Delete a few EquipePlantaos
     * const { count } = await prisma.equipePlantao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EquipePlantaoDeleteManyArgs>(args?: SelectSubset<T, EquipePlantaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EquipePlantaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipePlantaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EquipePlantaos
     * const equipePlantao = await prisma.equipePlantao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EquipePlantaoUpdateManyArgs>(args: SelectSubset<T, EquipePlantaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EquipePlantaos and returns the data updated in the database.
     * @param {EquipePlantaoUpdateManyAndReturnArgs} args - Arguments to update many EquipePlantaos.
     * @example
     * // Update many EquipePlantaos
     * const equipePlantao = await prisma.equipePlantao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EquipePlantaos and only return the `id`
     * const equipePlantaoWithIdOnly = await prisma.equipePlantao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EquipePlantaoUpdateManyAndReturnArgs>(args: SelectSubset<T, EquipePlantaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EquipePlantao.
     * @param {EquipePlantaoUpsertArgs} args - Arguments to update or create a EquipePlantao.
     * @example
     * // Update or create a EquipePlantao
     * const equipePlantao = await prisma.equipePlantao.upsert({
     *   create: {
     *     // ... data to create a EquipePlantao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EquipePlantao we want to update
     *   }
     * })
     */
    upsert<T extends EquipePlantaoUpsertArgs>(args: SelectSubset<T, EquipePlantaoUpsertArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EquipePlantaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipePlantaoCountArgs} args - Arguments to filter EquipePlantaos to count.
     * @example
     * // Count the number of EquipePlantaos
     * const count = await prisma.equipePlantao.count({
     *   where: {
     *     // ... the filter for the EquipePlantaos we want to count
     *   }
     * })
    **/
    count<T extends EquipePlantaoCountArgs>(
      args?: Subset<T, EquipePlantaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EquipePlantaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EquipePlantao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipePlantaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EquipePlantaoAggregateArgs>(args: Subset<T, EquipePlantaoAggregateArgs>): Prisma.PrismaPromise<GetEquipePlantaoAggregateType<T>>

    /**
     * Group by EquipePlantao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipePlantaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EquipePlantaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EquipePlantaoGroupByArgs['orderBy'] }
        : { orderBy?: EquipePlantaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EquipePlantaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipePlantaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EquipePlantao model
   */
  readonly fields: EquipePlantaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EquipePlantao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EquipePlantaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    membros<T extends EquipePlantao$membrosArgs<ExtArgs> = {}>(args?: Subset<T, EquipePlantao$membrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EquipePlantao model
   */
  interface EquipePlantaoFieldRefs {
    readonly id: FieldRef<"EquipePlantao", 'String'>
    readonly nome: FieldRef<"EquipePlantao", 'String'>
    readonly descricao: FieldRef<"EquipePlantao", 'String'>
    readonly cor: FieldRef<"EquipePlantao", 'String'>
    readonly ativo: FieldRef<"EquipePlantao", 'Boolean'>
    readonly queueId: FieldRef<"EquipePlantao", 'Int'>
    readonly queueName: FieldRef<"EquipePlantao", 'String'>
    readonly departamentos: FieldRef<"EquipePlantao", 'String[]'>
    readonly isFallback: FieldRef<"EquipePlantao", 'Boolean'>
    readonly createdAt: FieldRef<"EquipePlantao", 'DateTime'>
    readonly updatedAt: FieldRef<"EquipePlantao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EquipePlantao findUnique
   */
  export type EquipePlantaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * Filter, which EquipePlantao to fetch.
     */
    where: EquipePlantaoWhereUniqueInput
  }

  /**
   * EquipePlantao findUniqueOrThrow
   */
  export type EquipePlantaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * Filter, which EquipePlantao to fetch.
     */
    where: EquipePlantaoWhereUniqueInput
  }

  /**
   * EquipePlantao findFirst
   */
  export type EquipePlantaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * Filter, which EquipePlantao to fetch.
     */
    where?: EquipePlantaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipePlantaos to fetch.
     */
    orderBy?: EquipePlantaoOrderByWithRelationInput | EquipePlantaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EquipePlantaos.
     */
    cursor?: EquipePlantaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipePlantaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipePlantaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EquipePlantaos.
     */
    distinct?: EquipePlantaoScalarFieldEnum | EquipePlantaoScalarFieldEnum[]
  }

  /**
   * EquipePlantao findFirstOrThrow
   */
  export type EquipePlantaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * Filter, which EquipePlantao to fetch.
     */
    where?: EquipePlantaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipePlantaos to fetch.
     */
    orderBy?: EquipePlantaoOrderByWithRelationInput | EquipePlantaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EquipePlantaos.
     */
    cursor?: EquipePlantaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipePlantaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipePlantaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EquipePlantaos.
     */
    distinct?: EquipePlantaoScalarFieldEnum | EquipePlantaoScalarFieldEnum[]
  }

  /**
   * EquipePlantao findMany
   */
  export type EquipePlantaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * Filter, which EquipePlantaos to fetch.
     */
    where?: EquipePlantaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipePlantaos to fetch.
     */
    orderBy?: EquipePlantaoOrderByWithRelationInput | EquipePlantaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EquipePlantaos.
     */
    cursor?: EquipePlantaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipePlantaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipePlantaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EquipePlantaos.
     */
    distinct?: EquipePlantaoScalarFieldEnum | EquipePlantaoScalarFieldEnum[]
  }

  /**
   * EquipePlantao create
   */
  export type EquipePlantaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * The data needed to create a EquipePlantao.
     */
    data: XOR<EquipePlantaoCreateInput, EquipePlantaoUncheckedCreateInput>
  }

  /**
   * EquipePlantao createMany
   */
  export type EquipePlantaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EquipePlantaos.
     */
    data: EquipePlantaoCreateManyInput | EquipePlantaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EquipePlantao createManyAndReturn
   */
  export type EquipePlantaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * The data used to create many EquipePlantaos.
     */
    data: EquipePlantaoCreateManyInput | EquipePlantaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EquipePlantao update
   */
  export type EquipePlantaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * The data needed to update a EquipePlantao.
     */
    data: XOR<EquipePlantaoUpdateInput, EquipePlantaoUncheckedUpdateInput>
    /**
     * Choose, which EquipePlantao to update.
     */
    where: EquipePlantaoWhereUniqueInput
  }

  /**
   * EquipePlantao updateMany
   */
  export type EquipePlantaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EquipePlantaos.
     */
    data: XOR<EquipePlantaoUpdateManyMutationInput, EquipePlantaoUncheckedUpdateManyInput>
    /**
     * Filter which EquipePlantaos to update
     */
    where?: EquipePlantaoWhereInput
    /**
     * Limit how many EquipePlantaos to update.
     */
    limit?: number
  }

  /**
   * EquipePlantao updateManyAndReturn
   */
  export type EquipePlantaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * The data used to update EquipePlantaos.
     */
    data: XOR<EquipePlantaoUpdateManyMutationInput, EquipePlantaoUncheckedUpdateManyInput>
    /**
     * Filter which EquipePlantaos to update
     */
    where?: EquipePlantaoWhereInput
    /**
     * Limit how many EquipePlantaos to update.
     */
    limit?: number
  }

  /**
   * EquipePlantao upsert
   */
  export type EquipePlantaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * The filter to search for the EquipePlantao to update in case it exists.
     */
    where: EquipePlantaoWhereUniqueInput
    /**
     * In case the EquipePlantao found by the `where` argument doesn't exist, create a new EquipePlantao with this data.
     */
    create: XOR<EquipePlantaoCreateInput, EquipePlantaoUncheckedCreateInput>
    /**
     * In case the EquipePlantao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EquipePlantaoUpdateInput, EquipePlantaoUncheckedUpdateInput>
  }

  /**
   * EquipePlantao delete
   */
  export type EquipePlantaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
    /**
     * Filter which EquipePlantao to delete.
     */
    where: EquipePlantaoWhereUniqueInput
  }

  /**
   * EquipePlantao deleteMany
   */
  export type EquipePlantaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EquipePlantaos to delete
     */
    where?: EquipePlantaoWhereInput
    /**
     * Limit how many EquipePlantaos to delete.
     */
    limit?: number
  }

  /**
   * EquipePlantao.membros
   */
  export type EquipePlantao$membrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    where?: MembroEquipeWhereInput
    orderBy?: MembroEquipeOrderByWithRelationInput | MembroEquipeOrderByWithRelationInput[]
    cursor?: MembroEquipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembroEquipeScalarFieldEnum | MembroEquipeScalarFieldEnum[]
  }

  /**
   * EquipePlantao without action
   */
  export type EquipePlantaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipePlantao
     */
    select?: EquipePlantaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipePlantao
     */
    omit?: EquipePlantaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipePlantaoInclude<ExtArgs> | null
  }


  /**
   * Model MembroEquipe
   */

  export type AggregateMembroEquipe = {
    _count: MembroEquipeCountAggregateOutputType | null
    _avg: MembroEquipeAvgAggregateOutputType | null
    _sum: MembroEquipeSumAggregateOutputType | null
    _min: MembroEquipeMinAggregateOutputType | null
    _max: MembroEquipeMaxAggregateOutputType | null
  }

  export type MembroEquipeAvgAggregateOutputType = {
    ordemSequencial: number | null
    pesoPrioridade: number | null
    margemInicioMinutos: number | null
    margemFimMinutos: number | null
  }

  export type MembroEquipeSumAggregateOutputType = {
    ordemSequencial: number | null
    pesoPrioridade: number | null
    margemInicioMinutos: number | null
    margemFimMinutos: number | null
  }

  export type MembroEquipeMinAggregateOutputType = {
    id: string | null
    equipeId: string | null
    userId: string | null
    cargo: string | null
    ordemSequencial: number | null
    ultimoAtendimentoEm: Date | null
    pesoPrioridade: number | null
    margemInicioMinutos: number | null
    margemFimMinutos: number | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MembroEquipeMaxAggregateOutputType = {
    id: string | null
    equipeId: string | null
    userId: string | null
    cargo: string | null
    ordemSequencial: number | null
    ultimoAtendimentoEm: Date | null
    pesoPrioridade: number | null
    margemInicioMinutos: number | null
    margemFimMinutos: number | null
    ativo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MembroEquipeCountAggregateOutputType = {
    id: number
    equipeId: number
    userId: number
    cargo: number
    ordemSequencial: number
    ultimoAtendimentoEm: number
    pesoPrioridade: number
    turnos: number
    margemInicioMinutos: number
    margemFimMinutos: number
    ativo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MembroEquipeAvgAggregateInputType = {
    ordemSequencial?: true
    pesoPrioridade?: true
    margemInicioMinutos?: true
    margemFimMinutos?: true
  }

  export type MembroEquipeSumAggregateInputType = {
    ordemSequencial?: true
    pesoPrioridade?: true
    margemInicioMinutos?: true
    margemFimMinutos?: true
  }

  export type MembroEquipeMinAggregateInputType = {
    id?: true
    equipeId?: true
    userId?: true
    cargo?: true
    ordemSequencial?: true
    ultimoAtendimentoEm?: true
    pesoPrioridade?: true
    margemInicioMinutos?: true
    margemFimMinutos?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MembroEquipeMaxAggregateInputType = {
    id?: true
    equipeId?: true
    userId?: true
    cargo?: true
    ordemSequencial?: true
    ultimoAtendimentoEm?: true
    pesoPrioridade?: true
    margemInicioMinutos?: true
    margemFimMinutos?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MembroEquipeCountAggregateInputType = {
    id?: true
    equipeId?: true
    userId?: true
    cargo?: true
    ordemSequencial?: true
    ultimoAtendimentoEm?: true
    pesoPrioridade?: true
    turnos?: true
    margemInicioMinutos?: true
    margemFimMinutos?: true
    ativo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MembroEquipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MembroEquipe to aggregate.
     */
    where?: MembroEquipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MembroEquipes to fetch.
     */
    orderBy?: MembroEquipeOrderByWithRelationInput | MembroEquipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MembroEquipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MembroEquipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MembroEquipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MembroEquipes
    **/
    _count?: true | MembroEquipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MembroEquipeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MembroEquipeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembroEquipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembroEquipeMaxAggregateInputType
  }

  export type GetMembroEquipeAggregateType<T extends MembroEquipeAggregateArgs> = {
        [P in keyof T & keyof AggregateMembroEquipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembroEquipe[P]>
      : GetScalarType<T[P], AggregateMembroEquipe[P]>
  }




  export type MembroEquipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembroEquipeWhereInput
    orderBy?: MembroEquipeOrderByWithAggregationInput | MembroEquipeOrderByWithAggregationInput[]
    by: MembroEquipeScalarFieldEnum[] | MembroEquipeScalarFieldEnum
    having?: MembroEquipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembroEquipeCountAggregateInputType | true
    _avg?: MembroEquipeAvgAggregateInputType
    _sum?: MembroEquipeSumAggregateInputType
    _min?: MembroEquipeMinAggregateInputType
    _max?: MembroEquipeMaxAggregateInputType
  }

  export type MembroEquipeGroupByOutputType = {
    id: string
    equipeId: string
    userId: string
    cargo: string | null
    ordemSequencial: number
    ultimoAtendimentoEm: Date | null
    pesoPrioridade: number
    turnos: JsonValue | null
    margemInicioMinutos: number
    margemFimMinutos: number
    ativo: boolean
    createdAt: Date
    updatedAt: Date
    _count: MembroEquipeCountAggregateOutputType | null
    _avg: MembroEquipeAvgAggregateOutputType | null
    _sum: MembroEquipeSumAggregateOutputType | null
    _min: MembroEquipeMinAggregateOutputType | null
    _max: MembroEquipeMaxAggregateOutputType | null
  }

  type GetMembroEquipeGroupByPayload<T extends MembroEquipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MembroEquipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MembroEquipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MembroEquipeGroupByOutputType[P]>
            : GetScalarType<T[P], MembroEquipeGroupByOutputType[P]>
        }
      >
    >


  export type MembroEquipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipeId?: boolean
    userId?: boolean
    cargo?: boolean
    ordemSequencial?: boolean
    ultimoAtendimentoEm?: boolean
    pesoPrioridade?: boolean
    turnos?: boolean
    margemInicioMinutos?: boolean
    margemFimMinutos?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    equipe?: boolean | EquipePlantaoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membroEquipe"]>

  export type MembroEquipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipeId?: boolean
    userId?: boolean
    cargo?: boolean
    ordemSequencial?: boolean
    ultimoAtendimentoEm?: boolean
    pesoPrioridade?: boolean
    turnos?: boolean
    margemInicioMinutos?: boolean
    margemFimMinutos?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    equipe?: boolean | EquipePlantaoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membroEquipe"]>

  export type MembroEquipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipeId?: boolean
    userId?: boolean
    cargo?: boolean
    ordemSequencial?: boolean
    ultimoAtendimentoEm?: boolean
    pesoPrioridade?: boolean
    turnos?: boolean
    margemInicioMinutos?: boolean
    margemFimMinutos?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    equipe?: boolean | EquipePlantaoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membroEquipe"]>

  export type MembroEquipeSelectScalar = {
    id?: boolean
    equipeId?: boolean
    userId?: boolean
    cargo?: boolean
    ordemSequencial?: boolean
    ultimoAtendimentoEm?: boolean
    pesoPrioridade?: boolean
    turnos?: boolean
    margemInicioMinutos?: boolean
    margemFimMinutos?: boolean
    ativo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MembroEquipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "equipeId" | "userId" | "cargo" | "ordemSequencial" | "ultimoAtendimentoEm" | "pesoPrioridade" | "turnos" | "margemInicioMinutos" | "margemFimMinutos" | "ativo" | "createdAt" | "updatedAt", ExtArgs["result"]["membroEquipe"]>
  export type MembroEquipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    equipe?: boolean | EquipePlantaoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MembroEquipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    equipe?: boolean | EquipePlantaoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MembroEquipeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    equipe?: boolean | EquipePlantaoDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MembroEquipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MembroEquipe"
    objects: {
      equipe: Prisma.$EquipePlantaoPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      equipeId: string
      userId: string
      cargo: string | null
      ordemSequencial: number
      ultimoAtendimentoEm: Date | null
      pesoPrioridade: number
      turnos: Prisma.JsonValue | null
      margemInicioMinutos: number
      margemFimMinutos: number
      ativo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["membroEquipe"]>
    composites: {}
  }

  type MembroEquipeGetPayload<S extends boolean | null | undefined | MembroEquipeDefaultArgs> = $Result.GetResult<Prisma.$MembroEquipePayload, S>

  type MembroEquipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MembroEquipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MembroEquipeCountAggregateInputType | true
    }

  export interface MembroEquipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MembroEquipe'], meta: { name: 'MembroEquipe' } }
    /**
     * Find zero or one MembroEquipe that matches the filter.
     * @param {MembroEquipeFindUniqueArgs} args - Arguments to find a MembroEquipe
     * @example
     * // Get one MembroEquipe
     * const membroEquipe = await prisma.membroEquipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MembroEquipeFindUniqueArgs>(args: SelectSubset<T, MembroEquipeFindUniqueArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MembroEquipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MembroEquipeFindUniqueOrThrowArgs} args - Arguments to find a MembroEquipe
     * @example
     * // Get one MembroEquipe
     * const membroEquipe = await prisma.membroEquipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MembroEquipeFindUniqueOrThrowArgs>(args: SelectSubset<T, MembroEquipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MembroEquipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembroEquipeFindFirstArgs} args - Arguments to find a MembroEquipe
     * @example
     * // Get one MembroEquipe
     * const membroEquipe = await prisma.membroEquipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MembroEquipeFindFirstArgs>(args?: SelectSubset<T, MembroEquipeFindFirstArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MembroEquipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembroEquipeFindFirstOrThrowArgs} args - Arguments to find a MembroEquipe
     * @example
     * // Get one MembroEquipe
     * const membroEquipe = await prisma.membroEquipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MembroEquipeFindFirstOrThrowArgs>(args?: SelectSubset<T, MembroEquipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MembroEquipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembroEquipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MembroEquipes
     * const membroEquipes = await prisma.membroEquipe.findMany()
     * 
     * // Get first 10 MembroEquipes
     * const membroEquipes = await prisma.membroEquipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const membroEquipeWithIdOnly = await prisma.membroEquipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MembroEquipeFindManyArgs>(args?: SelectSubset<T, MembroEquipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MembroEquipe.
     * @param {MembroEquipeCreateArgs} args - Arguments to create a MembroEquipe.
     * @example
     * // Create one MembroEquipe
     * const MembroEquipe = await prisma.membroEquipe.create({
     *   data: {
     *     // ... data to create a MembroEquipe
     *   }
     * })
     * 
     */
    create<T extends MembroEquipeCreateArgs>(args: SelectSubset<T, MembroEquipeCreateArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MembroEquipes.
     * @param {MembroEquipeCreateManyArgs} args - Arguments to create many MembroEquipes.
     * @example
     * // Create many MembroEquipes
     * const membroEquipe = await prisma.membroEquipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MembroEquipeCreateManyArgs>(args?: SelectSubset<T, MembroEquipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MembroEquipes and returns the data saved in the database.
     * @param {MembroEquipeCreateManyAndReturnArgs} args - Arguments to create many MembroEquipes.
     * @example
     * // Create many MembroEquipes
     * const membroEquipe = await prisma.membroEquipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MembroEquipes and only return the `id`
     * const membroEquipeWithIdOnly = await prisma.membroEquipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MembroEquipeCreateManyAndReturnArgs>(args?: SelectSubset<T, MembroEquipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MembroEquipe.
     * @param {MembroEquipeDeleteArgs} args - Arguments to delete one MembroEquipe.
     * @example
     * // Delete one MembroEquipe
     * const MembroEquipe = await prisma.membroEquipe.delete({
     *   where: {
     *     // ... filter to delete one MembroEquipe
     *   }
     * })
     * 
     */
    delete<T extends MembroEquipeDeleteArgs>(args: SelectSubset<T, MembroEquipeDeleteArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MembroEquipe.
     * @param {MembroEquipeUpdateArgs} args - Arguments to update one MembroEquipe.
     * @example
     * // Update one MembroEquipe
     * const membroEquipe = await prisma.membroEquipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MembroEquipeUpdateArgs>(args: SelectSubset<T, MembroEquipeUpdateArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MembroEquipes.
     * @param {MembroEquipeDeleteManyArgs} args - Arguments to filter MembroEquipes to delete.
     * @example
     * // Delete a few MembroEquipes
     * const { count } = await prisma.membroEquipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MembroEquipeDeleteManyArgs>(args?: SelectSubset<T, MembroEquipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MembroEquipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembroEquipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MembroEquipes
     * const membroEquipe = await prisma.membroEquipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MembroEquipeUpdateManyArgs>(args: SelectSubset<T, MembroEquipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MembroEquipes and returns the data updated in the database.
     * @param {MembroEquipeUpdateManyAndReturnArgs} args - Arguments to update many MembroEquipes.
     * @example
     * // Update many MembroEquipes
     * const membroEquipe = await prisma.membroEquipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MembroEquipes and only return the `id`
     * const membroEquipeWithIdOnly = await prisma.membroEquipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MembroEquipeUpdateManyAndReturnArgs>(args: SelectSubset<T, MembroEquipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MembroEquipe.
     * @param {MembroEquipeUpsertArgs} args - Arguments to update or create a MembroEquipe.
     * @example
     * // Update or create a MembroEquipe
     * const membroEquipe = await prisma.membroEquipe.upsert({
     *   create: {
     *     // ... data to create a MembroEquipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MembroEquipe we want to update
     *   }
     * })
     */
    upsert<T extends MembroEquipeUpsertArgs>(args: SelectSubset<T, MembroEquipeUpsertArgs<ExtArgs>>): Prisma__MembroEquipeClient<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MembroEquipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembroEquipeCountArgs} args - Arguments to filter MembroEquipes to count.
     * @example
     * // Count the number of MembroEquipes
     * const count = await prisma.membroEquipe.count({
     *   where: {
     *     // ... the filter for the MembroEquipes we want to count
     *   }
     * })
    **/
    count<T extends MembroEquipeCountArgs>(
      args?: Subset<T, MembroEquipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembroEquipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MembroEquipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembroEquipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MembroEquipeAggregateArgs>(args: Subset<T, MembroEquipeAggregateArgs>): Prisma.PrismaPromise<GetMembroEquipeAggregateType<T>>

    /**
     * Group by MembroEquipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembroEquipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MembroEquipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembroEquipeGroupByArgs['orderBy'] }
        : { orderBy?: MembroEquipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MembroEquipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembroEquipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MembroEquipe model
   */
  readonly fields: MembroEquipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MembroEquipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MembroEquipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    equipe<T extends EquipePlantaoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EquipePlantaoDefaultArgs<ExtArgs>>): Prisma__EquipePlantaoClient<$Result.GetResult<Prisma.$EquipePlantaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MembroEquipe model
   */
  interface MembroEquipeFieldRefs {
    readonly id: FieldRef<"MembroEquipe", 'String'>
    readonly equipeId: FieldRef<"MembroEquipe", 'String'>
    readonly userId: FieldRef<"MembroEquipe", 'String'>
    readonly cargo: FieldRef<"MembroEquipe", 'String'>
    readonly ordemSequencial: FieldRef<"MembroEquipe", 'Int'>
    readonly ultimoAtendimentoEm: FieldRef<"MembroEquipe", 'DateTime'>
    readonly pesoPrioridade: FieldRef<"MembroEquipe", 'Int'>
    readonly turnos: FieldRef<"MembroEquipe", 'Json'>
    readonly margemInicioMinutos: FieldRef<"MembroEquipe", 'Int'>
    readonly margemFimMinutos: FieldRef<"MembroEquipe", 'Int'>
    readonly ativo: FieldRef<"MembroEquipe", 'Boolean'>
    readonly createdAt: FieldRef<"MembroEquipe", 'DateTime'>
    readonly updatedAt: FieldRef<"MembroEquipe", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MembroEquipe findUnique
   */
  export type MembroEquipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * Filter, which MembroEquipe to fetch.
     */
    where: MembroEquipeWhereUniqueInput
  }

  /**
   * MembroEquipe findUniqueOrThrow
   */
  export type MembroEquipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * Filter, which MembroEquipe to fetch.
     */
    where: MembroEquipeWhereUniqueInput
  }

  /**
   * MembroEquipe findFirst
   */
  export type MembroEquipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * Filter, which MembroEquipe to fetch.
     */
    where?: MembroEquipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MembroEquipes to fetch.
     */
    orderBy?: MembroEquipeOrderByWithRelationInput | MembroEquipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MembroEquipes.
     */
    cursor?: MembroEquipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MembroEquipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MembroEquipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MembroEquipes.
     */
    distinct?: MembroEquipeScalarFieldEnum | MembroEquipeScalarFieldEnum[]
  }

  /**
   * MembroEquipe findFirstOrThrow
   */
  export type MembroEquipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * Filter, which MembroEquipe to fetch.
     */
    where?: MembroEquipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MembroEquipes to fetch.
     */
    orderBy?: MembroEquipeOrderByWithRelationInput | MembroEquipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MembroEquipes.
     */
    cursor?: MembroEquipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MembroEquipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MembroEquipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MembroEquipes.
     */
    distinct?: MembroEquipeScalarFieldEnum | MembroEquipeScalarFieldEnum[]
  }

  /**
   * MembroEquipe findMany
   */
  export type MembroEquipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * Filter, which MembroEquipes to fetch.
     */
    where?: MembroEquipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MembroEquipes to fetch.
     */
    orderBy?: MembroEquipeOrderByWithRelationInput | MembroEquipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MembroEquipes.
     */
    cursor?: MembroEquipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MembroEquipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MembroEquipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MembroEquipes.
     */
    distinct?: MembroEquipeScalarFieldEnum | MembroEquipeScalarFieldEnum[]
  }

  /**
   * MembroEquipe create
   */
  export type MembroEquipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * The data needed to create a MembroEquipe.
     */
    data: XOR<MembroEquipeCreateInput, MembroEquipeUncheckedCreateInput>
  }

  /**
   * MembroEquipe createMany
   */
  export type MembroEquipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MembroEquipes.
     */
    data: MembroEquipeCreateManyInput | MembroEquipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MembroEquipe createManyAndReturn
   */
  export type MembroEquipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * The data used to create many MembroEquipes.
     */
    data: MembroEquipeCreateManyInput | MembroEquipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MembroEquipe update
   */
  export type MembroEquipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * The data needed to update a MembroEquipe.
     */
    data: XOR<MembroEquipeUpdateInput, MembroEquipeUncheckedUpdateInput>
    /**
     * Choose, which MembroEquipe to update.
     */
    where: MembroEquipeWhereUniqueInput
  }

  /**
   * MembroEquipe updateMany
   */
  export type MembroEquipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MembroEquipes.
     */
    data: XOR<MembroEquipeUpdateManyMutationInput, MembroEquipeUncheckedUpdateManyInput>
    /**
     * Filter which MembroEquipes to update
     */
    where?: MembroEquipeWhereInput
    /**
     * Limit how many MembroEquipes to update.
     */
    limit?: number
  }

  /**
   * MembroEquipe updateManyAndReturn
   */
  export type MembroEquipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * The data used to update MembroEquipes.
     */
    data: XOR<MembroEquipeUpdateManyMutationInput, MembroEquipeUncheckedUpdateManyInput>
    /**
     * Filter which MembroEquipes to update
     */
    where?: MembroEquipeWhereInput
    /**
     * Limit how many MembroEquipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MembroEquipe upsert
   */
  export type MembroEquipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * The filter to search for the MembroEquipe to update in case it exists.
     */
    where: MembroEquipeWhereUniqueInput
    /**
     * In case the MembroEquipe found by the `where` argument doesn't exist, create a new MembroEquipe with this data.
     */
    create: XOR<MembroEquipeCreateInput, MembroEquipeUncheckedCreateInput>
    /**
     * In case the MembroEquipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MembroEquipeUpdateInput, MembroEquipeUncheckedUpdateInput>
  }

  /**
   * MembroEquipe delete
   */
  export type MembroEquipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    /**
     * Filter which MembroEquipe to delete.
     */
    where: MembroEquipeWhereUniqueInput
  }

  /**
   * MembroEquipe deleteMany
   */
  export type MembroEquipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MembroEquipes to delete
     */
    where?: MembroEquipeWhereInput
    /**
     * Limit how many MembroEquipes to delete.
     */
    limit?: number
  }

  /**
   * MembroEquipe without action
   */
  export type MembroEquipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
  }


  /**
   * Model Plantonistas
   */

  export type AggregatePlantonistas = {
    _count: PlantonistasCountAggregateOutputType | null
    _avg: PlantonistasAvgAggregateOutputType | null
    _sum: PlantonistasSumAggregateOutputType | null
    _min: PlantonistasMinAggregateOutputType | null
    _max: PlantonistasMaxAggregateOutputType | null
  }

  export type PlantonistasAvgAggregateOutputType = {
    posicao: number | null
  }

  export type PlantonistasSumAggregateOutputType = {
    posicao: number | null
  }

  export type PlantonistasMinAggregateOutputType = {
    id: string | null
    nome: string | null
    posicao: number | null
    proxima_data: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type PlantonistasMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    posicao: number | null
    proxima_data: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type PlantonistasCountAggregateOutputType = {
    id: number
    nome: number
    posicao: number
    proxima_data: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type PlantonistasAvgAggregateInputType = {
    posicao?: true
  }

  export type PlantonistasSumAggregateInputType = {
    posicao?: true
  }

  export type PlantonistasMinAggregateInputType = {
    id?: true
    nome?: true
    posicao?: true
    proxima_data?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PlantonistasMaxAggregateInputType = {
    id?: true
    nome?: true
    posicao?: true
    proxima_data?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PlantonistasCountAggregateInputType = {
    id?: true
    nome?: true
    posicao?: true
    proxima_data?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type PlantonistasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plantonistas to aggregate.
     */
    where?: PlantonistasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plantonistas to fetch.
     */
    orderBy?: PlantonistasOrderByWithRelationInput | PlantonistasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlantonistasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plantonistas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plantonistas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plantonistas
    **/
    _count?: true | PlantonistasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlantonistasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlantonistasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlantonistasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlantonistasMaxAggregateInputType
  }

  export type GetPlantonistasAggregateType<T extends PlantonistasAggregateArgs> = {
        [P in keyof T & keyof AggregatePlantonistas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlantonistas[P]>
      : GetScalarType<T[P], AggregatePlantonistas[P]>
  }




  export type PlantonistasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlantonistasWhereInput
    orderBy?: PlantonistasOrderByWithAggregationInput | PlantonistasOrderByWithAggregationInput[]
    by: PlantonistasScalarFieldEnum[] | PlantonistasScalarFieldEnum
    having?: PlantonistasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlantonistasCountAggregateInputType | true
    _avg?: PlantonistasAvgAggregateInputType
    _sum?: PlantonistasSumAggregateInputType
    _min?: PlantonistasMinAggregateInputType
    _max?: PlantonistasMaxAggregateInputType
  }

  export type PlantonistasGroupByOutputType = {
    id: string
    nome: string
    posicao: number
    proxima_data: Date | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: PlantonistasCountAggregateOutputType | null
    _avg: PlantonistasAvgAggregateOutputType | null
    _sum: PlantonistasSumAggregateOutputType | null
    _min: PlantonistasMinAggregateOutputType | null
    _max: PlantonistasMaxAggregateOutputType | null
  }

  type GetPlantonistasGroupByPayload<T extends PlantonistasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlantonistasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlantonistasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlantonistasGroupByOutputType[P]>
            : GetScalarType<T[P], PlantonistasGroupByOutputType[P]>
        }
      >
    >


  export type PlantonistasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    posicao?: boolean
    proxima_data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    registros?: boolean | Plantonistas$registrosArgs<ExtArgs>
    _count?: boolean | PlantonistasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plantonistas"]>

  export type PlantonistasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    posicao?: boolean
    proxima_data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plantonistas"]>

  export type PlantonistasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    posicao?: boolean
    proxima_data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plantonistas"]>

  export type PlantonistasSelectScalar = {
    id?: boolean
    nome?: boolean
    posicao?: boolean
    proxima_data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type PlantonistasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "posicao" | "proxima_data" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["plantonistas"]>
  export type PlantonistasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    registros?: boolean | Plantonistas$registrosArgs<ExtArgs>
    _count?: boolean | PlantonistasCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlantonistasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PlantonistasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PlantonistasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plantonistas"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      registros: Prisma.$RegistrosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      posicao: number
      proxima_data: Date | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["plantonistas"]>
    composites: {}
  }

  type PlantonistasGetPayload<S extends boolean | null | undefined | PlantonistasDefaultArgs> = $Result.GetResult<Prisma.$PlantonistasPayload, S>

  type PlantonistasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlantonistasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlantonistasCountAggregateInputType | true
    }

  export interface PlantonistasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plantonistas'], meta: { name: 'Plantonistas' } }
    /**
     * Find zero or one Plantonistas that matches the filter.
     * @param {PlantonistasFindUniqueArgs} args - Arguments to find a Plantonistas
     * @example
     * // Get one Plantonistas
     * const plantonistas = await prisma.plantonistas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlantonistasFindUniqueArgs>(args: SelectSubset<T, PlantonistasFindUniqueArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plantonistas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlantonistasFindUniqueOrThrowArgs} args - Arguments to find a Plantonistas
     * @example
     * // Get one Plantonistas
     * const plantonistas = await prisma.plantonistas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlantonistasFindUniqueOrThrowArgs>(args: SelectSubset<T, PlantonistasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plantonistas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantonistasFindFirstArgs} args - Arguments to find a Plantonistas
     * @example
     * // Get one Plantonistas
     * const plantonistas = await prisma.plantonistas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlantonistasFindFirstArgs>(args?: SelectSubset<T, PlantonistasFindFirstArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plantonistas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantonistasFindFirstOrThrowArgs} args - Arguments to find a Plantonistas
     * @example
     * // Get one Plantonistas
     * const plantonistas = await prisma.plantonistas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlantonistasFindFirstOrThrowArgs>(args?: SelectSubset<T, PlantonistasFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plantonistas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantonistasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plantonistas
     * const plantonistas = await prisma.plantonistas.findMany()
     * 
     * // Get first 10 Plantonistas
     * const plantonistas = await prisma.plantonistas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const plantonistasWithIdOnly = await prisma.plantonistas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlantonistasFindManyArgs>(args?: SelectSubset<T, PlantonistasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plantonistas.
     * @param {PlantonistasCreateArgs} args - Arguments to create a Plantonistas.
     * @example
     * // Create one Plantonistas
     * const Plantonistas = await prisma.plantonistas.create({
     *   data: {
     *     // ... data to create a Plantonistas
     *   }
     * })
     * 
     */
    create<T extends PlantonistasCreateArgs>(args: SelectSubset<T, PlantonistasCreateArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plantonistas.
     * @param {PlantonistasCreateManyArgs} args - Arguments to create many Plantonistas.
     * @example
     * // Create many Plantonistas
     * const plantonistas = await prisma.plantonistas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlantonistasCreateManyArgs>(args?: SelectSubset<T, PlantonistasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plantonistas and returns the data saved in the database.
     * @param {PlantonistasCreateManyAndReturnArgs} args - Arguments to create many Plantonistas.
     * @example
     * // Create many Plantonistas
     * const plantonistas = await prisma.plantonistas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plantonistas and only return the `id`
     * const plantonistasWithIdOnly = await prisma.plantonistas.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlantonistasCreateManyAndReturnArgs>(args?: SelectSubset<T, PlantonistasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plantonistas.
     * @param {PlantonistasDeleteArgs} args - Arguments to delete one Plantonistas.
     * @example
     * // Delete one Plantonistas
     * const Plantonistas = await prisma.plantonistas.delete({
     *   where: {
     *     // ... filter to delete one Plantonistas
     *   }
     * })
     * 
     */
    delete<T extends PlantonistasDeleteArgs>(args: SelectSubset<T, PlantonistasDeleteArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plantonistas.
     * @param {PlantonistasUpdateArgs} args - Arguments to update one Plantonistas.
     * @example
     * // Update one Plantonistas
     * const plantonistas = await prisma.plantonistas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlantonistasUpdateArgs>(args: SelectSubset<T, PlantonistasUpdateArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plantonistas.
     * @param {PlantonistasDeleteManyArgs} args - Arguments to filter Plantonistas to delete.
     * @example
     * // Delete a few Plantonistas
     * const { count } = await prisma.plantonistas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlantonistasDeleteManyArgs>(args?: SelectSubset<T, PlantonistasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plantonistas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantonistasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plantonistas
     * const plantonistas = await prisma.plantonistas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlantonistasUpdateManyArgs>(args: SelectSubset<T, PlantonistasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plantonistas and returns the data updated in the database.
     * @param {PlantonistasUpdateManyAndReturnArgs} args - Arguments to update many Plantonistas.
     * @example
     * // Update many Plantonistas
     * const plantonistas = await prisma.plantonistas.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plantonistas and only return the `id`
     * const plantonistasWithIdOnly = await prisma.plantonistas.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlantonistasUpdateManyAndReturnArgs>(args: SelectSubset<T, PlantonistasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plantonistas.
     * @param {PlantonistasUpsertArgs} args - Arguments to update or create a Plantonistas.
     * @example
     * // Update or create a Plantonistas
     * const plantonistas = await prisma.plantonistas.upsert({
     *   create: {
     *     // ... data to create a Plantonistas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plantonistas we want to update
     *   }
     * })
     */
    upsert<T extends PlantonistasUpsertArgs>(args: SelectSubset<T, PlantonistasUpsertArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plantonistas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantonistasCountArgs} args - Arguments to filter Plantonistas to count.
     * @example
     * // Count the number of Plantonistas
     * const count = await prisma.plantonistas.count({
     *   where: {
     *     // ... the filter for the Plantonistas we want to count
     *   }
     * })
    **/
    count<T extends PlantonistasCountArgs>(
      args?: Subset<T, PlantonistasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlantonistasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plantonistas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantonistasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlantonistasAggregateArgs>(args: Subset<T, PlantonistasAggregateArgs>): Prisma.PrismaPromise<GetPlantonistasAggregateType<T>>

    /**
     * Group by Plantonistas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlantonistasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlantonistasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlantonistasGroupByArgs['orderBy'] }
        : { orderBy?: PlantonistasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlantonistasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlantonistasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plantonistas model
   */
  readonly fields: PlantonistasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plantonistas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlantonistasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    registros<T extends Plantonistas$registrosArgs<ExtArgs> = {}>(args?: Subset<T, Plantonistas$registrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plantonistas model
   */
  interface PlantonistasFieldRefs {
    readonly id: FieldRef<"Plantonistas", 'String'>
    readonly nome: FieldRef<"Plantonistas", 'String'>
    readonly posicao: FieldRef<"Plantonistas", 'Int'>
    readonly proxima_data: FieldRef<"Plantonistas", 'DateTime'>
    readonly createdAt: FieldRef<"Plantonistas", 'DateTime'>
    readonly updatedAt: FieldRef<"Plantonistas", 'DateTime'>
    readonly userId: FieldRef<"Plantonistas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Plantonistas findUnique
   */
  export type PlantonistasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * Filter, which Plantonistas to fetch.
     */
    where: PlantonistasWhereUniqueInput
  }

  /**
   * Plantonistas findUniqueOrThrow
   */
  export type PlantonistasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * Filter, which Plantonistas to fetch.
     */
    where: PlantonistasWhereUniqueInput
  }

  /**
   * Plantonistas findFirst
   */
  export type PlantonistasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * Filter, which Plantonistas to fetch.
     */
    where?: PlantonistasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plantonistas to fetch.
     */
    orderBy?: PlantonistasOrderByWithRelationInput | PlantonistasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plantonistas.
     */
    cursor?: PlantonistasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plantonistas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plantonistas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plantonistas.
     */
    distinct?: PlantonistasScalarFieldEnum | PlantonistasScalarFieldEnum[]
  }

  /**
   * Plantonistas findFirstOrThrow
   */
  export type PlantonistasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * Filter, which Plantonistas to fetch.
     */
    where?: PlantonistasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plantonistas to fetch.
     */
    orderBy?: PlantonistasOrderByWithRelationInput | PlantonistasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plantonistas.
     */
    cursor?: PlantonistasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plantonistas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plantonistas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plantonistas.
     */
    distinct?: PlantonistasScalarFieldEnum | PlantonistasScalarFieldEnum[]
  }

  /**
   * Plantonistas findMany
   */
  export type PlantonistasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * Filter, which Plantonistas to fetch.
     */
    where?: PlantonistasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plantonistas to fetch.
     */
    orderBy?: PlantonistasOrderByWithRelationInput | PlantonistasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plantonistas.
     */
    cursor?: PlantonistasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plantonistas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plantonistas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plantonistas.
     */
    distinct?: PlantonistasScalarFieldEnum | PlantonistasScalarFieldEnum[]
  }

  /**
   * Plantonistas create
   */
  export type PlantonistasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * The data needed to create a Plantonistas.
     */
    data: XOR<PlantonistasCreateInput, PlantonistasUncheckedCreateInput>
  }

  /**
   * Plantonistas createMany
   */
  export type PlantonistasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plantonistas.
     */
    data: PlantonistasCreateManyInput | PlantonistasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plantonistas createManyAndReturn
   */
  export type PlantonistasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * The data used to create many Plantonistas.
     */
    data: PlantonistasCreateManyInput | PlantonistasCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Plantonistas update
   */
  export type PlantonistasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * The data needed to update a Plantonistas.
     */
    data: XOR<PlantonistasUpdateInput, PlantonistasUncheckedUpdateInput>
    /**
     * Choose, which Plantonistas to update.
     */
    where: PlantonistasWhereUniqueInput
  }

  /**
   * Plantonistas updateMany
   */
  export type PlantonistasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plantonistas.
     */
    data: XOR<PlantonistasUpdateManyMutationInput, PlantonistasUncheckedUpdateManyInput>
    /**
     * Filter which Plantonistas to update
     */
    where?: PlantonistasWhereInput
    /**
     * Limit how many Plantonistas to update.
     */
    limit?: number
  }

  /**
   * Plantonistas updateManyAndReturn
   */
  export type PlantonistasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * The data used to update Plantonistas.
     */
    data: XOR<PlantonistasUpdateManyMutationInput, PlantonistasUncheckedUpdateManyInput>
    /**
     * Filter which Plantonistas to update
     */
    where?: PlantonistasWhereInput
    /**
     * Limit how many Plantonistas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Plantonistas upsert
   */
  export type PlantonistasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * The filter to search for the Plantonistas to update in case it exists.
     */
    where: PlantonistasWhereUniqueInput
    /**
     * In case the Plantonistas found by the `where` argument doesn't exist, create a new Plantonistas with this data.
     */
    create: XOR<PlantonistasCreateInput, PlantonistasUncheckedCreateInput>
    /**
     * In case the Plantonistas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlantonistasUpdateInput, PlantonistasUncheckedUpdateInput>
  }

  /**
   * Plantonistas delete
   */
  export type PlantonistasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    /**
     * Filter which Plantonistas to delete.
     */
    where: PlantonistasWhereUniqueInput
  }

  /**
   * Plantonistas deleteMany
   */
  export type PlantonistasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plantonistas to delete
     */
    where?: PlantonistasWhereInput
    /**
     * Limit how many Plantonistas to delete.
     */
    limit?: number
  }

  /**
   * Plantonistas.registros
   */
  export type Plantonistas$registrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    where?: RegistrosWhereInput
    orderBy?: RegistrosOrderByWithRelationInput | RegistrosOrderByWithRelationInput[]
    cursor?: RegistrosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * Plantonistas without action
   */
  export type PlantonistasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
  }


  /**
   * Model Registros
   */

  export type AggregateRegistros = {
    _count: RegistrosCountAggregateOutputType | null
    _min: RegistrosMinAggregateOutputType | null
    _max: RegistrosMaxAggregateOutputType | null
  }

  export type RegistrosMinAggregateOutputType = {
    id: string | null
    plantao_id: string | null
    user_id: string | null
    data: Date | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegistrosMaxAggregateOutputType = {
    id: string | null
    plantao_id: string | null
    user_id: string | null
    data: Date | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegistrosCountAggregateOutputType = {
    id: number
    plantao_id: number
    user_id: number
    data: number
    startTime: number
    endTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RegistrosMinAggregateInputType = {
    id?: true
    plantao_id?: true
    user_id?: true
    data?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegistrosMaxAggregateInputType = {
    id?: true
    plantao_id?: true
    user_id?: true
    data?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegistrosCountAggregateInputType = {
    id?: true
    plantao_id?: true
    user_id?: true
    data?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RegistrosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registros to aggregate.
     */
    where?: RegistrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registros to fetch.
     */
    orderBy?: RegistrosOrderByWithRelationInput | RegistrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Registros
    **/
    _count?: true | RegistrosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrosMaxAggregateInputType
  }

  export type GetRegistrosAggregateType<T extends RegistrosAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistros]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistros[P]>
      : GetScalarType<T[P], AggregateRegistros[P]>
  }




  export type RegistrosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrosWhereInput
    orderBy?: RegistrosOrderByWithAggregationInput | RegistrosOrderByWithAggregationInput[]
    by: RegistrosScalarFieldEnum[] | RegistrosScalarFieldEnum
    having?: RegistrosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrosCountAggregateInputType | true
    _min?: RegistrosMinAggregateInputType
    _max?: RegistrosMaxAggregateInputType
  }

  export type RegistrosGroupByOutputType = {
    id: string
    plantao_id: string
    user_id: string
    data: Date
    startTime: Date
    endTime: Date
    createdAt: Date
    updatedAt: Date
    _count: RegistrosCountAggregateOutputType | null
    _min: RegistrosMinAggregateOutputType | null
    _max: RegistrosMaxAggregateOutputType | null
  }

  type GetRegistrosGroupByPayload<T extends RegistrosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrosGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrosGroupByOutputType[P]>
        }
      >
    >


  export type RegistrosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plantao_id?: boolean
    user_id?: boolean
    data?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plantao?: boolean | PlantonistasDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registros"]>

  export type RegistrosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plantao_id?: boolean
    user_id?: boolean
    data?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plantao?: boolean | PlantonistasDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registros"]>

  export type RegistrosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plantao_id?: boolean
    user_id?: boolean
    data?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plantao?: boolean | PlantonistasDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registros"]>

  export type RegistrosSelectScalar = {
    id?: boolean
    plantao_id?: boolean
    user_id?: boolean
    data?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RegistrosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "plantao_id" | "user_id" | "data" | "startTime" | "endTime" | "createdAt" | "updatedAt", ExtArgs["result"]["registros"]>
  export type RegistrosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plantao?: boolean | PlantonistasDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RegistrosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plantao?: boolean | PlantonistasDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RegistrosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plantao?: boolean | PlantonistasDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RegistrosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Registros"
    objects: {
      plantao: Prisma.$PlantonistasPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      plantao_id: string
      user_id: string
      data: Date
      startTime: Date
      endTime: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["registros"]>
    composites: {}
  }

  type RegistrosGetPayload<S extends boolean | null | undefined | RegistrosDefaultArgs> = $Result.GetResult<Prisma.$RegistrosPayload, S>

  type RegistrosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistrosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrosCountAggregateInputType | true
    }

  export interface RegistrosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Registros'], meta: { name: 'Registros' } }
    /**
     * Find zero or one Registros that matches the filter.
     * @param {RegistrosFindUniqueArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrosFindUniqueArgs>(args: SelectSubset<T, RegistrosFindUniqueArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Registros that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrosFindUniqueOrThrowArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrosFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistrosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosFindFirstArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrosFindFirstArgs>(args?: SelectSubset<T, RegistrosFindFirstArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registros that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosFindFirstOrThrowArgs} args - Arguments to find a Registros
     * @example
     * // Get one Registros
     * const registros = await prisma.registros.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrosFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistrosFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registros
     * const registros = await prisma.registros.findMany()
     * 
     * // Get first 10 Registros
     * const registros = await prisma.registros.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrosWithIdOnly = await prisma.registros.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistrosFindManyArgs>(args?: SelectSubset<T, RegistrosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Registros.
     * @param {RegistrosCreateArgs} args - Arguments to create a Registros.
     * @example
     * // Create one Registros
     * const Registros = await prisma.registros.create({
     *   data: {
     *     // ... data to create a Registros
     *   }
     * })
     * 
     */
    create<T extends RegistrosCreateArgs>(args: SelectSubset<T, RegistrosCreateArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Registros.
     * @param {RegistrosCreateManyArgs} args - Arguments to create many Registros.
     * @example
     * // Create many Registros
     * const registros = await prisma.registros.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistrosCreateManyArgs>(args?: SelectSubset<T, RegistrosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Registros and returns the data saved in the database.
     * @param {RegistrosCreateManyAndReturnArgs} args - Arguments to create many Registros.
     * @example
     * // Create many Registros
     * const registros = await prisma.registros.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Registros and only return the `id`
     * const registrosWithIdOnly = await prisma.registros.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistrosCreateManyAndReturnArgs>(args?: SelectSubset<T, RegistrosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Registros.
     * @param {RegistrosDeleteArgs} args - Arguments to delete one Registros.
     * @example
     * // Delete one Registros
     * const Registros = await prisma.registros.delete({
     *   where: {
     *     // ... filter to delete one Registros
     *   }
     * })
     * 
     */
    delete<T extends RegistrosDeleteArgs>(args: SelectSubset<T, RegistrosDeleteArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Registros.
     * @param {RegistrosUpdateArgs} args - Arguments to update one Registros.
     * @example
     * // Update one Registros
     * const registros = await prisma.registros.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistrosUpdateArgs>(args: SelectSubset<T, RegistrosUpdateArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Registros.
     * @param {RegistrosDeleteManyArgs} args - Arguments to filter Registros to delete.
     * @example
     * // Delete a few Registros
     * const { count } = await prisma.registros.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistrosDeleteManyArgs>(args?: SelectSubset<T, RegistrosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registros
     * const registros = await prisma.registros.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistrosUpdateManyArgs>(args: SelectSubset<T, RegistrosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registros and returns the data updated in the database.
     * @param {RegistrosUpdateManyAndReturnArgs} args - Arguments to update many Registros.
     * @example
     * // Update many Registros
     * const registros = await prisma.registros.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Registros and only return the `id`
     * const registrosWithIdOnly = await prisma.registros.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegistrosUpdateManyAndReturnArgs>(args: SelectSubset<T, RegistrosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Registros.
     * @param {RegistrosUpsertArgs} args - Arguments to update or create a Registros.
     * @example
     * // Update or create a Registros
     * const registros = await prisma.registros.upsert({
     *   create: {
     *     // ... data to create a Registros
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registros we want to update
     *   }
     * })
     */
    upsert<T extends RegistrosUpsertArgs>(args: SelectSubset<T, RegistrosUpsertArgs<ExtArgs>>): Prisma__RegistrosClient<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosCountArgs} args - Arguments to filter Registros to count.
     * @example
     * // Count the number of Registros
     * const count = await prisma.registros.count({
     *   where: {
     *     // ... the filter for the Registros we want to count
     *   }
     * })
    **/
    count<T extends RegistrosCountArgs>(
      args?: Subset<T, RegistrosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrosAggregateArgs>(args: Subset<T, RegistrosAggregateArgs>): Prisma.PrismaPromise<GetRegistrosAggregateType<T>>

    /**
     * Group by Registros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistrosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistrosGroupByArgs['orderBy'] }
        : { orderBy?: RegistrosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistrosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Registros model
   */
  readonly fields: RegistrosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Registros.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistrosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plantao<T extends PlantonistasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlantonistasDefaultArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Registros model
   */
  interface RegistrosFieldRefs {
    readonly id: FieldRef<"Registros", 'String'>
    readonly plantao_id: FieldRef<"Registros", 'String'>
    readonly user_id: FieldRef<"Registros", 'String'>
    readonly data: FieldRef<"Registros", 'DateTime'>
    readonly startTime: FieldRef<"Registros", 'DateTime'>
    readonly endTime: FieldRef<"Registros", 'DateTime'>
    readonly createdAt: FieldRef<"Registros", 'DateTime'>
    readonly updatedAt: FieldRef<"Registros", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Registros findUnique
   */
  export type RegistrosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * Filter, which Registros to fetch.
     */
    where: RegistrosWhereUniqueInput
  }

  /**
   * Registros findUniqueOrThrow
   */
  export type RegistrosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * Filter, which Registros to fetch.
     */
    where: RegistrosWhereUniqueInput
  }

  /**
   * Registros findFirst
   */
  export type RegistrosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * Filter, which Registros to fetch.
     */
    where?: RegistrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registros to fetch.
     */
    orderBy?: RegistrosOrderByWithRelationInput | RegistrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registros.
     */
    cursor?: RegistrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registros.
     */
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * Registros findFirstOrThrow
   */
  export type RegistrosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * Filter, which Registros to fetch.
     */
    where?: RegistrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registros to fetch.
     */
    orderBy?: RegistrosOrderByWithRelationInput | RegistrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registros.
     */
    cursor?: RegistrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registros.
     */
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * Registros findMany
   */
  export type RegistrosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * Filter, which Registros to fetch.
     */
    where?: RegistrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registros to fetch.
     */
    orderBy?: RegistrosOrderByWithRelationInput | RegistrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Registros.
     */
    cursor?: RegistrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registros.
     */
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * Registros create
   */
  export type RegistrosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * The data needed to create a Registros.
     */
    data: XOR<RegistrosCreateInput, RegistrosUncheckedCreateInput>
  }

  /**
   * Registros createMany
   */
  export type RegistrosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Registros.
     */
    data: RegistrosCreateManyInput | RegistrosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Registros createManyAndReturn
   */
  export type RegistrosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * The data used to create many Registros.
     */
    data: RegistrosCreateManyInput | RegistrosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Registros update
   */
  export type RegistrosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * The data needed to update a Registros.
     */
    data: XOR<RegistrosUpdateInput, RegistrosUncheckedUpdateInput>
    /**
     * Choose, which Registros to update.
     */
    where: RegistrosWhereUniqueInput
  }

  /**
   * Registros updateMany
   */
  export type RegistrosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Registros.
     */
    data: XOR<RegistrosUpdateManyMutationInput, RegistrosUncheckedUpdateManyInput>
    /**
     * Filter which Registros to update
     */
    where?: RegistrosWhereInput
    /**
     * Limit how many Registros to update.
     */
    limit?: number
  }

  /**
   * Registros updateManyAndReturn
   */
  export type RegistrosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * The data used to update Registros.
     */
    data: XOR<RegistrosUpdateManyMutationInput, RegistrosUncheckedUpdateManyInput>
    /**
     * Filter which Registros to update
     */
    where?: RegistrosWhereInput
    /**
     * Limit how many Registros to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Registros upsert
   */
  export type RegistrosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * The filter to search for the Registros to update in case it exists.
     */
    where: RegistrosWhereUniqueInput
    /**
     * In case the Registros found by the `where` argument doesn't exist, create a new Registros with this data.
     */
    create: XOR<RegistrosCreateInput, RegistrosUncheckedCreateInput>
    /**
     * In case the Registros was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistrosUpdateInput, RegistrosUncheckedUpdateInput>
  }

  /**
   * Registros delete
   */
  export type RegistrosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    /**
     * Filter which Registros to delete.
     */
    where: RegistrosWhereUniqueInput
  }

  /**
   * Registros deleteMany
   */
  export type RegistrosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registros to delete
     */
    where?: RegistrosWhereInput
    /**
     * Limit how many Registros to delete.
     */
    limit?: number
  }

  /**
   * Registros without action
   */
  export type RegistrosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
  }


  /**
   * Model ExternalToken
   */

  export type AggregateExternalToken = {
    _count: ExternalTokenCountAggregateOutputType | null
    _min: ExternalTokenMinAggregateOutputType | null
    _max: ExternalTokenMaxAggregateOutputType | null
  }

  export type ExternalTokenMinAggregateOutputType = {
    id: string | null
    serviceName: string | null
    token: string | null
    apiUrl: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExternalTokenMaxAggregateOutputType = {
    id: string | null
    serviceName: string | null
    token: string | null
    apiUrl: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExternalTokenCountAggregateOutputType = {
    id: number
    serviceName: number
    token: number
    apiUrl: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExternalTokenMinAggregateInputType = {
    id?: true
    serviceName?: true
    token?: true
    apiUrl?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExternalTokenMaxAggregateInputType = {
    id?: true
    serviceName?: true
    token?: true
    apiUrl?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExternalTokenCountAggregateInputType = {
    id?: true
    serviceName?: true
    token?: true
    apiUrl?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExternalTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalToken to aggregate.
     */
    where?: ExternalTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalTokens to fetch.
     */
    orderBy?: ExternalTokenOrderByWithRelationInput | ExternalTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExternalTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExternalTokens
    **/
    _count?: true | ExternalTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExternalTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExternalTokenMaxAggregateInputType
  }

  export type GetExternalTokenAggregateType<T extends ExternalTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateExternalToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExternalToken[P]>
      : GetScalarType<T[P], AggregateExternalToken[P]>
  }




  export type ExternalTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExternalTokenWhereInput
    orderBy?: ExternalTokenOrderByWithAggregationInput | ExternalTokenOrderByWithAggregationInput[]
    by: ExternalTokenScalarFieldEnum[] | ExternalTokenScalarFieldEnum
    having?: ExternalTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExternalTokenCountAggregateInputType | true
    _min?: ExternalTokenMinAggregateInputType
    _max?: ExternalTokenMaxAggregateInputType
  }

  export type ExternalTokenGroupByOutputType = {
    id: string
    serviceName: string
    token: string
    apiUrl: string | null
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ExternalTokenCountAggregateOutputType | null
    _min: ExternalTokenMinAggregateOutputType | null
    _max: ExternalTokenMaxAggregateOutputType | null
  }

  type GetExternalTokenGroupByPayload<T extends ExternalTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExternalTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExternalTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExternalTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ExternalTokenGroupByOutputType[P]>
        }
      >
    >


  export type ExternalTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceName?: boolean
    token?: boolean
    apiUrl?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["externalToken"]>

  export type ExternalTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceName?: boolean
    token?: boolean
    apiUrl?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["externalToken"]>

  export type ExternalTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceName?: boolean
    token?: boolean
    apiUrl?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["externalToken"]>

  export type ExternalTokenSelectScalar = {
    id?: boolean
    serviceName?: boolean
    token?: boolean
    apiUrl?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExternalTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceName" | "token" | "apiUrl" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["externalToken"]>

  export type $ExternalTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExternalToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceName: string
      token: string
      apiUrl: string | null
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["externalToken"]>
    composites: {}
  }

  type ExternalTokenGetPayload<S extends boolean | null | undefined | ExternalTokenDefaultArgs> = $Result.GetResult<Prisma.$ExternalTokenPayload, S>

  type ExternalTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExternalTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExternalTokenCountAggregateInputType | true
    }

  export interface ExternalTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExternalToken'], meta: { name: 'ExternalToken' } }
    /**
     * Find zero or one ExternalToken that matches the filter.
     * @param {ExternalTokenFindUniqueArgs} args - Arguments to find a ExternalToken
     * @example
     * // Get one ExternalToken
     * const externalToken = await prisma.externalToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExternalTokenFindUniqueArgs>(args: SelectSubset<T, ExternalTokenFindUniqueArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExternalToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExternalTokenFindUniqueOrThrowArgs} args - Arguments to find a ExternalToken
     * @example
     * // Get one ExternalToken
     * const externalToken = await prisma.externalToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExternalTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ExternalTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalTokenFindFirstArgs} args - Arguments to find a ExternalToken
     * @example
     * // Get one ExternalToken
     * const externalToken = await prisma.externalToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExternalTokenFindFirstArgs>(args?: SelectSubset<T, ExternalTokenFindFirstArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalTokenFindFirstOrThrowArgs} args - Arguments to find a ExternalToken
     * @example
     * // Get one ExternalToken
     * const externalToken = await prisma.externalToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExternalTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ExternalTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExternalTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExternalTokens
     * const externalTokens = await prisma.externalToken.findMany()
     * 
     * // Get first 10 ExternalTokens
     * const externalTokens = await prisma.externalToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const externalTokenWithIdOnly = await prisma.externalToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExternalTokenFindManyArgs>(args?: SelectSubset<T, ExternalTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExternalToken.
     * @param {ExternalTokenCreateArgs} args - Arguments to create a ExternalToken.
     * @example
     * // Create one ExternalToken
     * const ExternalToken = await prisma.externalToken.create({
     *   data: {
     *     // ... data to create a ExternalToken
     *   }
     * })
     * 
     */
    create<T extends ExternalTokenCreateArgs>(args: SelectSubset<T, ExternalTokenCreateArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExternalTokens.
     * @param {ExternalTokenCreateManyArgs} args - Arguments to create many ExternalTokens.
     * @example
     * // Create many ExternalTokens
     * const externalToken = await prisma.externalToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExternalTokenCreateManyArgs>(args?: SelectSubset<T, ExternalTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExternalTokens and returns the data saved in the database.
     * @param {ExternalTokenCreateManyAndReturnArgs} args - Arguments to create many ExternalTokens.
     * @example
     * // Create many ExternalTokens
     * const externalToken = await prisma.externalToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExternalTokens and only return the `id`
     * const externalTokenWithIdOnly = await prisma.externalToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExternalTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, ExternalTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExternalToken.
     * @param {ExternalTokenDeleteArgs} args - Arguments to delete one ExternalToken.
     * @example
     * // Delete one ExternalToken
     * const ExternalToken = await prisma.externalToken.delete({
     *   where: {
     *     // ... filter to delete one ExternalToken
     *   }
     * })
     * 
     */
    delete<T extends ExternalTokenDeleteArgs>(args: SelectSubset<T, ExternalTokenDeleteArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExternalToken.
     * @param {ExternalTokenUpdateArgs} args - Arguments to update one ExternalToken.
     * @example
     * // Update one ExternalToken
     * const externalToken = await prisma.externalToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExternalTokenUpdateArgs>(args: SelectSubset<T, ExternalTokenUpdateArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExternalTokens.
     * @param {ExternalTokenDeleteManyArgs} args - Arguments to filter ExternalTokens to delete.
     * @example
     * // Delete a few ExternalTokens
     * const { count } = await prisma.externalToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExternalTokenDeleteManyArgs>(args?: SelectSubset<T, ExternalTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExternalTokens
     * const externalToken = await prisma.externalToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExternalTokenUpdateManyArgs>(args: SelectSubset<T, ExternalTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalTokens and returns the data updated in the database.
     * @param {ExternalTokenUpdateManyAndReturnArgs} args - Arguments to update many ExternalTokens.
     * @example
     * // Update many ExternalTokens
     * const externalToken = await prisma.externalToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExternalTokens and only return the `id`
     * const externalTokenWithIdOnly = await prisma.externalToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExternalTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, ExternalTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExternalToken.
     * @param {ExternalTokenUpsertArgs} args - Arguments to update or create a ExternalToken.
     * @example
     * // Update or create a ExternalToken
     * const externalToken = await prisma.externalToken.upsert({
     *   create: {
     *     // ... data to create a ExternalToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExternalToken we want to update
     *   }
     * })
     */
    upsert<T extends ExternalTokenUpsertArgs>(args: SelectSubset<T, ExternalTokenUpsertArgs<ExtArgs>>): Prisma__ExternalTokenClient<$Result.GetResult<Prisma.$ExternalTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExternalTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalTokenCountArgs} args - Arguments to filter ExternalTokens to count.
     * @example
     * // Count the number of ExternalTokens
     * const count = await prisma.externalToken.count({
     *   where: {
     *     // ... the filter for the ExternalTokens we want to count
     *   }
     * })
    **/
    count<T extends ExternalTokenCountArgs>(
      args?: Subset<T, ExternalTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExternalTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExternalToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExternalTokenAggregateArgs>(args: Subset<T, ExternalTokenAggregateArgs>): Prisma.PrismaPromise<GetExternalTokenAggregateType<T>>

    /**
     * Group by ExternalToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExternalTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExternalTokenGroupByArgs['orderBy'] }
        : { orderBy?: ExternalTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExternalTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExternalTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExternalToken model
   */
  readonly fields: ExternalTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExternalToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExternalTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExternalToken model
   */
  interface ExternalTokenFieldRefs {
    readonly id: FieldRef<"ExternalToken", 'String'>
    readonly serviceName: FieldRef<"ExternalToken", 'String'>
    readonly token: FieldRef<"ExternalToken", 'String'>
    readonly apiUrl: FieldRef<"ExternalToken", 'String'>
    readonly description: FieldRef<"ExternalToken", 'String'>
    readonly isActive: FieldRef<"ExternalToken", 'Boolean'>
    readonly createdAt: FieldRef<"ExternalToken", 'DateTime'>
    readonly updatedAt: FieldRef<"ExternalToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExternalToken findUnique
   */
  export type ExternalTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * Filter, which ExternalToken to fetch.
     */
    where: ExternalTokenWhereUniqueInput
  }

  /**
   * ExternalToken findUniqueOrThrow
   */
  export type ExternalTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * Filter, which ExternalToken to fetch.
     */
    where: ExternalTokenWhereUniqueInput
  }

  /**
   * ExternalToken findFirst
   */
  export type ExternalTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * Filter, which ExternalToken to fetch.
     */
    where?: ExternalTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalTokens to fetch.
     */
    orderBy?: ExternalTokenOrderByWithRelationInput | ExternalTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalTokens.
     */
    cursor?: ExternalTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalTokens.
     */
    distinct?: ExternalTokenScalarFieldEnum | ExternalTokenScalarFieldEnum[]
  }

  /**
   * ExternalToken findFirstOrThrow
   */
  export type ExternalTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * Filter, which ExternalToken to fetch.
     */
    where?: ExternalTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalTokens to fetch.
     */
    orderBy?: ExternalTokenOrderByWithRelationInput | ExternalTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalTokens.
     */
    cursor?: ExternalTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalTokens.
     */
    distinct?: ExternalTokenScalarFieldEnum | ExternalTokenScalarFieldEnum[]
  }

  /**
   * ExternalToken findMany
   */
  export type ExternalTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * Filter, which ExternalTokens to fetch.
     */
    where?: ExternalTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalTokens to fetch.
     */
    orderBy?: ExternalTokenOrderByWithRelationInput | ExternalTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExternalTokens.
     */
    cursor?: ExternalTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalTokens.
     */
    distinct?: ExternalTokenScalarFieldEnum | ExternalTokenScalarFieldEnum[]
  }

  /**
   * ExternalToken create
   */
  export type ExternalTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a ExternalToken.
     */
    data: XOR<ExternalTokenCreateInput, ExternalTokenUncheckedCreateInput>
  }

  /**
   * ExternalToken createMany
   */
  export type ExternalTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExternalTokens.
     */
    data: ExternalTokenCreateManyInput | ExternalTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExternalToken createManyAndReturn
   */
  export type ExternalTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * The data used to create many ExternalTokens.
     */
    data: ExternalTokenCreateManyInput | ExternalTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExternalToken update
   */
  export type ExternalTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a ExternalToken.
     */
    data: XOR<ExternalTokenUpdateInput, ExternalTokenUncheckedUpdateInput>
    /**
     * Choose, which ExternalToken to update.
     */
    where: ExternalTokenWhereUniqueInput
  }

  /**
   * ExternalToken updateMany
   */
  export type ExternalTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExternalTokens.
     */
    data: XOR<ExternalTokenUpdateManyMutationInput, ExternalTokenUncheckedUpdateManyInput>
    /**
     * Filter which ExternalTokens to update
     */
    where?: ExternalTokenWhereInput
    /**
     * Limit how many ExternalTokens to update.
     */
    limit?: number
  }

  /**
   * ExternalToken updateManyAndReturn
   */
  export type ExternalTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * The data used to update ExternalTokens.
     */
    data: XOR<ExternalTokenUpdateManyMutationInput, ExternalTokenUncheckedUpdateManyInput>
    /**
     * Filter which ExternalTokens to update
     */
    where?: ExternalTokenWhereInput
    /**
     * Limit how many ExternalTokens to update.
     */
    limit?: number
  }

  /**
   * ExternalToken upsert
   */
  export type ExternalTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the ExternalToken to update in case it exists.
     */
    where: ExternalTokenWhereUniqueInput
    /**
     * In case the ExternalToken found by the `where` argument doesn't exist, create a new ExternalToken with this data.
     */
    create: XOR<ExternalTokenCreateInput, ExternalTokenUncheckedCreateInput>
    /**
     * In case the ExternalToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExternalTokenUpdateInput, ExternalTokenUncheckedUpdateInput>
  }

  /**
   * ExternalToken delete
   */
  export type ExternalTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
    /**
     * Filter which ExternalToken to delete.
     */
    where: ExternalTokenWhereUniqueInput
  }

  /**
   * ExternalToken deleteMany
   */
  export type ExternalTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalTokens to delete
     */
    where?: ExternalTokenWhereInput
    /**
     * Limit how many ExternalTokens to delete.
     */
    limit?: number
  }

  /**
   * ExternalToken without action
   */
  export type ExternalTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalToken
     */
    select?: ExternalTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalToken
     */
    omit?: ExternalTokenOmit<ExtArgs> | null
  }


  /**
   * Model TomticketReportCache
   */

  export type AggregateTomticketReportCache = {
    _count: TomticketReportCacheCountAggregateOutputType | null
    _min: TomticketReportCacheMinAggregateOutputType | null
    _max: TomticketReportCacheMaxAggregateOutputType | null
  }

  export type TomticketReportCacheMinAggregateOutputType = {
    id: string | null
    startDate: string | null
    endDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TomticketReportCacheMaxAggregateOutputType = {
    id: string | null
    startDate: string | null
    endDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TomticketReportCacheCountAggregateOutputType = {
    id: number
    startDate: number
    endDate: number
    data: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TomticketReportCacheMinAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TomticketReportCacheMaxAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TomticketReportCacheCountAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TomticketReportCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TomticketReportCache to aggregate.
     */
    where?: TomticketReportCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TomticketReportCaches to fetch.
     */
    orderBy?: TomticketReportCacheOrderByWithRelationInput | TomticketReportCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TomticketReportCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TomticketReportCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TomticketReportCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TomticketReportCaches
    **/
    _count?: true | TomticketReportCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TomticketReportCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TomticketReportCacheMaxAggregateInputType
  }

  export type GetTomticketReportCacheAggregateType<T extends TomticketReportCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateTomticketReportCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTomticketReportCache[P]>
      : GetScalarType<T[P], AggregateTomticketReportCache[P]>
  }




  export type TomticketReportCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TomticketReportCacheWhereInput
    orderBy?: TomticketReportCacheOrderByWithAggregationInput | TomticketReportCacheOrderByWithAggregationInput[]
    by: TomticketReportCacheScalarFieldEnum[] | TomticketReportCacheScalarFieldEnum
    having?: TomticketReportCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TomticketReportCacheCountAggregateInputType | true
    _min?: TomticketReportCacheMinAggregateInputType
    _max?: TomticketReportCacheMaxAggregateInputType
  }

  export type TomticketReportCacheGroupByOutputType = {
    id: string
    startDate: string
    endDate: string
    data: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: TomticketReportCacheCountAggregateOutputType | null
    _min: TomticketReportCacheMinAggregateOutputType | null
    _max: TomticketReportCacheMaxAggregateOutputType | null
  }

  type GetTomticketReportCacheGroupByPayload<T extends TomticketReportCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TomticketReportCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TomticketReportCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TomticketReportCacheGroupByOutputType[P]>
            : GetScalarType<T[P], TomticketReportCacheGroupByOutputType[P]>
        }
      >
    >


  export type TomticketReportCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tomticketReportCache"]>

  export type TomticketReportCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tomticketReportCache"]>

  export type TomticketReportCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tomticketReportCache"]>

  export type TomticketReportCacheSelectScalar = {
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TomticketReportCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "startDate" | "endDate" | "data" | "createdAt" | "updatedAt", ExtArgs["result"]["tomticketReportCache"]>

  export type $TomticketReportCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TomticketReportCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      startDate: string
      endDate: string
      data: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tomticketReportCache"]>
    composites: {}
  }

  type TomticketReportCacheGetPayload<S extends boolean | null | undefined | TomticketReportCacheDefaultArgs> = $Result.GetResult<Prisma.$TomticketReportCachePayload, S>

  type TomticketReportCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TomticketReportCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TomticketReportCacheCountAggregateInputType | true
    }

  export interface TomticketReportCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TomticketReportCache'], meta: { name: 'TomticketReportCache' } }
    /**
     * Find zero or one TomticketReportCache that matches the filter.
     * @param {TomticketReportCacheFindUniqueArgs} args - Arguments to find a TomticketReportCache
     * @example
     * // Get one TomticketReportCache
     * const tomticketReportCache = await prisma.tomticketReportCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TomticketReportCacheFindUniqueArgs>(args: SelectSubset<T, TomticketReportCacheFindUniqueArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TomticketReportCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TomticketReportCacheFindUniqueOrThrowArgs} args - Arguments to find a TomticketReportCache
     * @example
     * // Get one TomticketReportCache
     * const tomticketReportCache = await prisma.tomticketReportCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TomticketReportCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, TomticketReportCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TomticketReportCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TomticketReportCacheFindFirstArgs} args - Arguments to find a TomticketReportCache
     * @example
     * // Get one TomticketReportCache
     * const tomticketReportCache = await prisma.tomticketReportCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TomticketReportCacheFindFirstArgs>(args?: SelectSubset<T, TomticketReportCacheFindFirstArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TomticketReportCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TomticketReportCacheFindFirstOrThrowArgs} args - Arguments to find a TomticketReportCache
     * @example
     * // Get one TomticketReportCache
     * const tomticketReportCache = await prisma.tomticketReportCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TomticketReportCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, TomticketReportCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TomticketReportCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TomticketReportCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TomticketReportCaches
     * const tomticketReportCaches = await prisma.tomticketReportCache.findMany()
     * 
     * // Get first 10 TomticketReportCaches
     * const tomticketReportCaches = await prisma.tomticketReportCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tomticketReportCacheWithIdOnly = await prisma.tomticketReportCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TomticketReportCacheFindManyArgs>(args?: SelectSubset<T, TomticketReportCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TomticketReportCache.
     * @param {TomticketReportCacheCreateArgs} args - Arguments to create a TomticketReportCache.
     * @example
     * // Create one TomticketReportCache
     * const TomticketReportCache = await prisma.tomticketReportCache.create({
     *   data: {
     *     // ... data to create a TomticketReportCache
     *   }
     * })
     * 
     */
    create<T extends TomticketReportCacheCreateArgs>(args: SelectSubset<T, TomticketReportCacheCreateArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TomticketReportCaches.
     * @param {TomticketReportCacheCreateManyArgs} args - Arguments to create many TomticketReportCaches.
     * @example
     * // Create many TomticketReportCaches
     * const tomticketReportCache = await prisma.tomticketReportCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TomticketReportCacheCreateManyArgs>(args?: SelectSubset<T, TomticketReportCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TomticketReportCaches and returns the data saved in the database.
     * @param {TomticketReportCacheCreateManyAndReturnArgs} args - Arguments to create many TomticketReportCaches.
     * @example
     * // Create many TomticketReportCaches
     * const tomticketReportCache = await prisma.tomticketReportCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TomticketReportCaches and only return the `id`
     * const tomticketReportCacheWithIdOnly = await prisma.tomticketReportCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TomticketReportCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, TomticketReportCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TomticketReportCache.
     * @param {TomticketReportCacheDeleteArgs} args - Arguments to delete one TomticketReportCache.
     * @example
     * // Delete one TomticketReportCache
     * const TomticketReportCache = await prisma.tomticketReportCache.delete({
     *   where: {
     *     // ... filter to delete one TomticketReportCache
     *   }
     * })
     * 
     */
    delete<T extends TomticketReportCacheDeleteArgs>(args: SelectSubset<T, TomticketReportCacheDeleteArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TomticketReportCache.
     * @param {TomticketReportCacheUpdateArgs} args - Arguments to update one TomticketReportCache.
     * @example
     * // Update one TomticketReportCache
     * const tomticketReportCache = await prisma.tomticketReportCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TomticketReportCacheUpdateArgs>(args: SelectSubset<T, TomticketReportCacheUpdateArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TomticketReportCaches.
     * @param {TomticketReportCacheDeleteManyArgs} args - Arguments to filter TomticketReportCaches to delete.
     * @example
     * // Delete a few TomticketReportCaches
     * const { count } = await prisma.tomticketReportCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TomticketReportCacheDeleteManyArgs>(args?: SelectSubset<T, TomticketReportCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TomticketReportCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TomticketReportCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TomticketReportCaches
     * const tomticketReportCache = await prisma.tomticketReportCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TomticketReportCacheUpdateManyArgs>(args: SelectSubset<T, TomticketReportCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TomticketReportCaches and returns the data updated in the database.
     * @param {TomticketReportCacheUpdateManyAndReturnArgs} args - Arguments to update many TomticketReportCaches.
     * @example
     * // Update many TomticketReportCaches
     * const tomticketReportCache = await prisma.tomticketReportCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TomticketReportCaches and only return the `id`
     * const tomticketReportCacheWithIdOnly = await prisma.tomticketReportCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TomticketReportCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, TomticketReportCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TomticketReportCache.
     * @param {TomticketReportCacheUpsertArgs} args - Arguments to update or create a TomticketReportCache.
     * @example
     * // Update or create a TomticketReportCache
     * const tomticketReportCache = await prisma.tomticketReportCache.upsert({
     *   create: {
     *     // ... data to create a TomticketReportCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TomticketReportCache we want to update
     *   }
     * })
     */
    upsert<T extends TomticketReportCacheUpsertArgs>(args: SelectSubset<T, TomticketReportCacheUpsertArgs<ExtArgs>>): Prisma__TomticketReportCacheClient<$Result.GetResult<Prisma.$TomticketReportCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TomticketReportCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TomticketReportCacheCountArgs} args - Arguments to filter TomticketReportCaches to count.
     * @example
     * // Count the number of TomticketReportCaches
     * const count = await prisma.tomticketReportCache.count({
     *   where: {
     *     // ... the filter for the TomticketReportCaches we want to count
     *   }
     * })
    **/
    count<T extends TomticketReportCacheCountArgs>(
      args?: Subset<T, TomticketReportCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TomticketReportCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TomticketReportCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TomticketReportCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TomticketReportCacheAggregateArgs>(args: Subset<T, TomticketReportCacheAggregateArgs>): Prisma.PrismaPromise<GetTomticketReportCacheAggregateType<T>>

    /**
     * Group by TomticketReportCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TomticketReportCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TomticketReportCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TomticketReportCacheGroupByArgs['orderBy'] }
        : { orderBy?: TomticketReportCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TomticketReportCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTomticketReportCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TomticketReportCache model
   */
  readonly fields: TomticketReportCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TomticketReportCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TomticketReportCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TomticketReportCache model
   */
  interface TomticketReportCacheFieldRefs {
    readonly id: FieldRef<"TomticketReportCache", 'String'>
    readonly startDate: FieldRef<"TomticketReportCache", 'String'>
    readonly endDate: FieldRef<"TomticketReportCache", 'String'>
    readonly data: FieldRef<"TomticketReportCache", 'Json'>
    readonly createdAt: FieldRef<"TomticketReportCache", 'DateTime'>
    readonly updatedAt: FieldRef<"TomticketReportCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TomticketReportCache findUnique
   */
  export type TomticketReportCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * Filter, which TomticketReportCache to fetch.
     */
    where: TomticketReportCacheWhereUniqueInput
  }

  /**
   * TomticketReportCache findUniqueOrThrow
   */
  export type TomticketReportCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * Filter, which TomticketReportCache to fetch.
     */
    where: TomticketReportCacheWhereUniqueInput
  }

  /**
   * TomticketReportCache findFirst
   */
  export type TomticketReportCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * Filter, which TomticketReportCache to fetch.
     */
    where?: TomticketReportCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TomticketReportCaches to fetch.
     */
    orderBy?: TomticketReportCacheOrderByWithRelationInput | TomticketReportCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TomticketReportCaches.
     */
    cursor?: TomticketReportCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TomticketReportCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TomticketReportCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TomticketReportCaches.
     */
    distinct?: TomticketReportCacheScalarFieldEnum | TomticketReportCacheScalarFieldEnum[]
  }

  /**
   * TomticketReportCache findFirstOrThrow
   */
  export type TomticketReportCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * Filter, which TomticketReportCache to fetch.
     */
    where?: TomticketReportCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TomticketReportCaches to fetch.
     */
    orderBy?: TomticketReportCacheOrderByWithRelationInput | TomticketReportCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TomticketReportCaches.
     */
    cursor?: TomticketReportCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TomticketReportCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TomticketReportCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TomticketReportCaches.
     */
    distinct?: TomticketReportCacheScalarFieldEnum | TomticketReportCacheScalarFieldEnum[]
  }

  /**
   * TomticketReportCache findMany
   */
  export type TomticketReportCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * Filter, which TomticketReportCaches to fetch.
     */
    where?: TomticketReportCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TomticketReportCaches to fetch.
     */
    orderBy?: TomticketReportCacheOrderByWithRelationInput | TomticketReportCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TomticketReportCaches.
     */
    cursor?: TomticketReportCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TomticketReportCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TomticketReportCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TomticketReportCaches.
     */
    distinct?: TomticketReportCacheScalarFieldEnum | TomticketReportCacheScalarFieldEnum[]
  }

  /**
   * TomticketReportCache create
   */
  export type TomticketReportCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a TomticketReportCache.
     */
    data: XOR<TomticketReportCacheCreateInput, TomticketReportCacheUncheckedCreateInput>
  }

  /**
   * TomticketReportCache createMany
   */
  export type TomticketReportCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TomticketReportCaches.
     */
    data: TomticketReportCacheCreateManyInput | TomticketReportCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TomticketReportCache createManyAndReturn
   */
  export type TomticketReportCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * The data used to create many TomticketReportCaches.
     */
    data: TomticketReportCacheCreateManyInput | TomticketReportCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TomticketReportCache update
   */
  export type TomticketReportCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a TomticketReportCache.
     */
    data: XOR<TomticketReportCacheUpdateInput, TomticketReportCacheUncheckedUpdateInput>
    /**
     * Choose, which TomticketReportCache to update.
     */
    where: TomticketReportCacheWhereUniqueInput
  }

  /**
   * TomticketReportCache updateMany
   */
  export type TomticketReportCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TomticketReportCaches.
     */
    data: XOR<TomticketReportCacheUpdateManyMutationInput, TomticketReportCacheUncheckedUpdateManyInput>
    /**
     * Filter which TomticketReportCaches to update
     */
    where?: TomticketReportCacheWhereInput
    /**
     * Limit how many TomticketReportCaches to update.
     */
    limit?: number
  }

  /**
   * TomticketReportCache updateManyAndReturn
   */
  export type TomticketReportCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * The data used to update TomticketReportCaches.
     */
    data: XOR<TomticketReportCacheUpdateManyMutationInput, TomticketReportCacheUncheckedUpdateManyInput>
    /**
     * Filter which TomticketReportCaches to update
     */
    where?: TomticketReportCacheWhereInput
    /**
     * Limit how many TomticketReportCaches to update.
     */
    limit?: number
  }

  /**
   * TomticketReportCache upsert
   */
  export type TomticketReportCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the TomticketReportCache to update in case it exists.
     */
    where: TomticketReportCacheWhereUniqueInput
    /**
     * In case the TomticketReportCache found by the `where` argument doesn't exist, create a new TomticketReportCache with this data.
     */
    create: XOR<TomticketReportCacheCreateInput, TomticketReportCacheUncheckedCreateInput>
    /**
     * In case the TomticketReportCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TomticketReportCacheUpdateInput, TomticketReportCacheUncheckedUpdateInput>
  }

  /**
   * TomticketReportCache delete
   */
  export type TomticketReportCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
    /**
     * Filter which TomticketReportCache to delete.
     */
    where: TomticketReportCacheWhereUniqueInput
  }

  /**
   * TomticketReportCache deleteMany
   */
  export type TomticketReportCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TomticketReportCaches to delete
     */
    where?: TomticketReportCacheWhereInput
    /**
     * Limit how many TomticketReportCaches to delete.
     */
    limit?: number
  }

  /**
   * TomticketReportCache without action
   */
  export type TomticketReportCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TomticketReportCache
     */
    select?: TomticketReportCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TomticketReportCache
     */
    omit?: TomticketReportCacheOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    zproId: number | null
    posicao: number | null
  }

  export type UserSumAggregateOutputType = {
    zproId: number | null
    posicao: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    pass: string | null
    createdAt: Date | null
    updatedAt: Date | null
    role: $Enums.NivelAcesso | null
    typeUser: $Enums.TipoUsuario | null
    id_atendente: string | null
    zproId: number | null
    slackId: string | null
    isPlantonista: boolean | null
    posicao: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    pass: string | null
    createdAt: Date | null
    updatedAt: Date | null
    role: $Enums.NivelAcesso | null
    typeUser: $Enums.TipoUsuario | null
    id_atendente: string | null
    zproId: number | null
    slackId: string | null
    isPlantonista: boolean | null
    posicao: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    pass: number
    createdAt: number
    updatedAt: number
    role: number
    typeUser: number
    id_atendente: number
    zproId: number
    slackId: number
    isPlantonista: number
    posicao: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    zproId?: true
    posicao?: true
  }

  export type UserSumAggregateInputType = {
    zproId?: true
    posicao?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    pass?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    typeUser?: true
    id_atendente?: true
    zproId?: true
    slackId?: true
    isPlantonista?: true
    posicao?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    pass?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    typeUser?: true
    id_atendente?: true
    zproId?: true
    slackId?: true
    isPlantonista?: true
    posicao?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    pass?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    typeUser?: true
    id_atendente?: true
    zproId?: true
    slackId?: true
    isPlantonista?: true
    posicao?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    pass: string | null
    createdAt: Date
    updatedAt: Date
    role: $Enums.NivelAcesso
    typeUser: $Enums.TipoUsuario
    id_atendente: string | null
    zproId: number | null
    slackId: string | null
    isPlantonista: boolean
    posicao: number | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    pass?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    typeUser?: boolean
    id_atendente?: boolean
    zproId?: boolean
    slackId?: boolean
    isPlantonista?: boolean
    posicao?: boolean
    plantao?: boolean | User$plantaoArgs<ExtArgs>
    registros?: boolean | User$registrosArgs<ExtArgs>
    membrosEquipe?: boolean | User$membrosEquipeArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    pass?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    typeUser?: boolean
    id_atendente?: boolean
    zproId?: boolean
    slackId?: boolean
    isPlantonista?: boolean
    posicao?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    pass?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    typeUser?: boolean
    id_atendente?: boolean
    zproId?: boolean
    slackId?: boolean
    isPlantonista?: boolean
    posicao?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    pass?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    typeUser?: boolean
    id_atendente?: boolean
    zproId?: boolean
    slackId?: boolean
    isPlantonista?: boolean
    posicao?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "pass" | "createdAt" | "updatedAt" | "role" | "typeUser" | "id_atendente" | "zproId" | "slackId" | "isPlantonista" | "posicao", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plantao?: boolean | User$plantaoArgs<ExtArgs>
    registros?: boolean | User$registrosArgs<ExtArgs>
    membrosEquipe?: boolean | User$membrosEquipeArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      plantao: Prisma.$PlantonistasPayload<ExtArgs> | null
      registros: Prisma.$RegistrosPayload<ExtArgs>[]
      membrosEquipe: Prisma.$MembroEquipePayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      pass: string | null
      createdAt: Date
      updatedAt: Date
      role: $Enums.NivelAcesso
      typeUser: $Enums.TipoUsuario
      id_atendente: string | null
      zproId: number | null
      slackId: string | null
      isPlantonista: boolean
      posicao: number | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plantao<T extends User$plantaoArgs<ExtArgs> = {}>(args?: Subset<T, User$plantaoArgs<ExtArgs>>): Prisma__PlantonistasClient<$Result.GetResult<Prisma.$PlantonistasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    registros<T extends User$registrosArgs<ExtArgs> = {}>(args?: Subset<T, User$registrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    membrosEquipe<T extends User$membrosEquipeArgs<ExtArgs> = {}>(args?: Subset<T, User$membrosEquipeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembroEquipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly pass: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'NivelAcesso'>
    readonly typeUser: FieldRef<"User", 'TipoUsuario'>
    readonly id_atendente: FieldRef<"User", 'String'>
    readonly zproId: FieldRef<"User", 'Int'>
    readonly slackId: FieldRef<"User", 'String'>
    readonly isPlantonista: FieldRef<"User", 'Boolean'>
    readonly posicao: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.plantao
   */
  export type User$plantaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plantonistas
     */
    select?: PlantonistasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plantonistas
     */
    omit?: PlantonistasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlantonistasInclude<ExtArgs> | null
    where?: PlantonistasWhereInput
  }

  /**
   * User.registros
   */
  export type User$registrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registros
     */
    select?: RegistrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registros
     */
    omit?: RegistrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrosInclude<ExtArgs> | null
    where?: RegistrosWhereInput
    orderBy?: RegistrosOrderByWithRelationInput | RegistrosOrderByWithRelationInput[]
    cursor?: RegistrosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrosScalarFieldEnum | RegistrosScalarFieldEnum[]
  }

  /**
   * User.membrosEquipe
   */
  export type User$membrosEquipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembroEquipe
     */
    select?: MembroEquipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MembroEquipe
     */
    omit?: MembroEquipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembroEquipeInclude<ExtArgs> | null
    where?: MembroEquipeWhereInput
    orderBy?: MembroEquipeOrderByWithRelationInput | MembroEquipeOrderByWithRelationInput[]
    cursor?: MembroEquipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembroEquipeScalarFieldEnum | MembroEquipeScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AtendimentoScalarFieldEnum: {
    id: 'id',
    ticketZpro: 'ticketZpro',
    ticketTomticket: 'ticketTomticket',
    sincronizado: 'sincronizado',
    clienteId: 'clienteId',
    cnpj: 'cnpj',
    atendente: 'atendente',
    protocolo: 'protocolo',
    nomeContato: 'nomeContato',
    tipoAtendimento: 'tipoAtendimento',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AtendimentoScalarFieldEnum = (typeof AtendimentoScalarFieldEnum)[keyof typeof AtendimentoScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    issuer: 'issuer',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const EquipePlantaoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    descricao: 'descricao',
    cor: 'cor',
    ativo: 'ativo',
    queueId: 'queueId',
    queueName: 'queueName',
    departamentos: 'departamentos',
    isFallback: 'isFallback',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EquipePlantaoScalarFieldEnum = (typeof EquipePlantaoScalarFieldEnum)[keyof typeof EquipePlantaoScalarFieldEnum]


  export const MembroEquipeScalarFieldEnum: {
    id: 'id',
    equipeId: 'equipeId',
    userId: 'userId',
    cargo: 'cargo',
    ordemSequencial: 'ordemSequencial',
    ultimoAtendimentoEm: 'ultimoAtendimentoEm',
    pesoPrioridade: 'pesoPrioridade',
    turnos: 'turnos',
    margemInicioMinutos: 'margemInicioMinutos',
    margemFimMinutos: 'margemFimMinutos',
    ativo: 'ativo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MembroEquipeScalarFieldEnum = (typeof MembroEquipeScalarFieldEnum)[keyof typeof MembroEquipeScalarFieldEnum]


  export const PlantonistasScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    posicao: 'posicao',
    proxima_data: 'proxima_data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type PlantonistasScalarFieldEnum = (typeof PlantonistasScalarFieldEnum)[keyof typeof PlantonistasScalarFieldEnum]


  export const RegistrosScalarFieldEnum: {
    id: 'id',
    plantao_id: 'plantao_id',
    user_id: 'user_id',
    data: 'data',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RegistrosScalarFieldEnum = (typeof RegistrosScalarFieldEnum)[keyof typeof RegistrosScalarFieldEnum]


  export const ExternalTokenScalarFieldEnum: {
    id: 'id',
    serviceName: 'serviceName',
    token: 'token',
    apiUrl: 'apiUrl',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExternalTokenScalarFieldEnum = (typeof ExternalTokenScalarFieldEnum)[keyof typeof ExternalTokenScalarFieldEnum]


  export const TomticketReportCacheScalarFieldEnum: {
    id: 'id',
    startDate: 'startDate',
    endDate: 'endDate',
    data: 'data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TomticketReportCacheScalarFieldEnum = (typeof TomticketReportCacheScalarFieldEnum)[keyof typeof TomticketReportCacheScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    pass: 'pass',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    role: 'role',
    typeUser: 'typeUser',
    id_atendente: 'id_atendente',
    zproId: 'zproId',
    slackId: 'slackId',
    isPlantonista: 'isPlantonista',
    posicao: 'posicao'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'NivelAcesso'
   */
  export type EnumNivelAcessoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NivelAcesso'>
    


  /**
   * Reference to a field of type 'NivelAcesso[]'
   */
  export type ListEnumNivelAcessoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NivelAcesso[]'>
    


  /**
   * Reference to a field of type 'TipoUsuario'
   */
  export type EnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario'>
    


  /**
   * Reference to a field of type 'TipoUsuario[]'
   */
  export type ListEnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AtendimentoWhereInput = {
    AND?: AtendimentoWhereInput | AtendimentoWhereInput[]
    OR?: AtendimentoWhereInput[]
    NOT?: AtendimentoWhereInput | AtendimentoWhereInput[]
    id?: StringFilter<"Atendimento"> | string
    ticketZpro?: StringNullableFilter<"Atendimento"> | string | null
    ticketTomticket?: StringNullableFilter<"Atendimento"> | string | null
    sincronizado?: BoolFilter<"Atendimento"> | boolean
    clienteId?: StringNullableFilter<"Atendimento"> | string | null
    cnpj?: StringNullableFilter<"Atendimento"> | string | null
    atendente?: StringNullableFilter<"Atendimento"> | string | null
    protocolo?: StringNullableFilter<"Atendimento"> | string | null
    nomeContato?: StringNullableFilter<"Atendimento"> | string | null
    tipoAtendimento?: StringNullableFilter<"Atendimento"> | string | null
    createdAt?: DateTimeFilter<"Atendimento"> | Date | string
    updatedAt?: DateTimeFilter<"Atendimento"> | Date | string
  }

  export type AtendimentoOrderByWithRelationInput = {
    id?: SortOrder
    ticketZpro?: SortOrderInput | SortOrder
    ticketTomticket?: SortOrderInput | SortOrder
    sincronizado?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    cnpj?: SortOrderInput | SortOrder
    atendente?: SortOrderInput | SortOrder
    protocolo?: SortOrderInput | SortOrder
    nomeContato?: SortOrderInput | SortOrder
    tipoAtendimento?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AtendimentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AtendimentoWhereInput | AtendimentoWhereInput[]
    OR?: AtendimentoWhereInput[]
    NOT?: AtendimentoWhereInput | AtendimentoWhereInput[]
    ticketZpro?: StringNullableFilter<"Atendimento"> | string | null
    ticketTomticket?: StringNullableFilter<"Atendimento"> | string | null
    sincronizado?: BoolFilter<"Atendimento"> | boolean
    clienteId?: StringNullableFilter<"Atendimento"> | string | null
    cnpj?: StringNullableFilter<"Atendimento"> | string | null
    atendente?: StringNullableFilter<"Atendimento"> | string | null
    protocolo?: StringNullableFilter<"Atendimento"> | string | null
    nomeContato?: StringNullableFilter<"Atendimento"> | string | null
    tipoAtendimento?: StringNullableFilter<"Atendimento"> | string | null
    createdAt?: DateTimeFilter<"Atendimento"> | Date | string
    updatedAt?: DateTimeFilter<"Atendimento"> | Date | string
  }, "id">

  export type AtendimentoOrderByWithAggregationInput = {
    id?: SortOrder
    ticketZpro?: SortOrderInput | SortOrder
    ticketTomticket?: SortOrderInput | SortOrder
    sincronizado?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    cnpj?: SortOrderInput | SortOrder
    atendente?: SortOrderInput | SortOrder
    protocolo?: SortOrderInput | SortOrder
    nomeContato?: SortOrderInput | SortOrder
    tipoAtendimento?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AtendimentoCountOrderByAggregateInput
    _max?: AtendimentoMaxOrderByAggregateInput
    _min?: AtendimentoMinOrderByAggregateInput
  }

  export type AtendimentoScalarWhereWithAggregatesInput = {
    AND?: AtendimentoScalarWhereWithAggregatesInput | AtendimentoScalarWhereWithAggregatesInput[]
    OR?: AtendimentoScalarWhereWithAggregatesInput[]
    NOT?: AtendimentoScalarWhereWithAggregatesInput | AtendimentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Atendimento"> | string
    ticketZpro?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    ticketTomticket?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    sincronizado?: BoolWithAggregatesFilter<"Atendimento"> | boolean
    clienteId?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    cnpj?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    atendente?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    protocolo?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    nomeContato?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    tipoAtendimento?: StringNullableWithAggregatesFilter<"Atendimento"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Atendimento"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Atendimento"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    issuer?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    issuer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    issuer?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    issuer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    issuer?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
  }

  export type EquipePlantaoWhereInput = {
    AND?: EquipePlantaoWhereInput | EquipePlantaoWhereInput[]
    OR?: EquipePlantaoWhereInput[]
    NOT?: EquipePlantaoWhereInput | EquipePlantaoWhereInput[]
    id?: StringFilter<"EquipePlantao"> | string
    nome?: StringFilter<"EquipePlantao"> | string
    descricao?: StringNullableFilter<"EquipePlantao"> | string | null
    cor?: StringNullableFilter<"EquipePlantao"> | string | null
    ativo?: BoolFilter<"EquipePlantao"> | boolean
    queueId?: IntNullableFilter<"EquipePlantao"> | number | null
    queueName?: StringNullableFilter<"EquipePlantao"> | string | null
    departamentos?: StringNullableListFilter<"EquipePlantao">
    isFallback?: BoolFilter<"EquipePlantao"> | boolean
    createdAt?: DateTimeFilter<"EquipePlantao"> | Date | string
    updatedAt?: DateTimeFilter<"EquipePlantao"> | Date | string
    membros?: MembroEquipeListRelationFilter
  }

  export type EquipePlantaoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    cor?: SortOrderInput | SortOrder
    ativo?: SortOrder
    queueId?: SortOrderInput | SortOrder
    queueName?: SortOrderInput | SortOrder
    departamentos?: SortOrder
    isFallback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    membros?: MembroEquipeOrderByRelationAggregateInput
  }

  export type EquipePlantaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EquipePlantaoWhereInput | EquipePlantaoWhereInput[]
    OR?: EquipePlantaoWhereInput[]
    NOT?: EquipePlantaoWhereInput | EquipePlantaoWhereInput[]
    nome?: StringFilter<"EquipePlantao"> | string
    descricao?: StringNullableFilter<"EquipePlantao"> | string | null
    cor?: StringNullableFilter<"EquipePlantao"> | string | null
    ativo?: BoolFilter<"EquipePlantao"> | boolean
    queueId?: IntNullableFilter<"EquipePlantao"> | number | null
    queueName?: StringNullableFilter<"EquipePlantao"> | string | null
    departamentos?: StringNullableListFilter<"EquipePlantao">
    isFallback?: BoolFilter<"EquipePlantao"> | boolean
    createdAt?: DateTimeFilter<"EquipePlantao"> | Date | string
    updatedAt?: DateTimeFilter<"EquipePlantao"> | Date | string
    membros?: MembroEquipeListRelationFilter
  }, "id">

  export type EquipePlantaoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    cor?: SortOrderInput | SortOrder
    ativo?: SortOrder
    queueId?: SortOrderInput | SortOrder
    queueName?: SortOrderInput | SortOrder
    departamentos?: SortOrder
    isFallback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EquipePlantaoCountOrderByAggregateInput
    _avg?: EquipePlantaoAvgOrderByAggregateInput
    _max?: EquipePlantaoMaxOrderByAggregateInput
    _min?: EquipePlantaoMinOrderByAggregateInput
    _sum?: EquipePlantaoSumOrderByAggregateInput
  }

  export type EquipePlantaoScalarWhereWithAggregatesInput = {
    AND?: EquipePlantaoScalarWhereWithAggregatesInput | EquipePlantaoScalarWhereWithAggregatesInput[]
    OR?: EquipePlantaoScalarWhereWithAggregatesInput[]
    NOT?: EquipePlantaoScalarWhereWithAggregatesInput | EquipePlantaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EquipePlantao"> | string
    nome?: StringWithAggregatesFilter<"EquipePlantao"> | string
    descricao?: StringNullableWithAggregatesFilter<"EquipePlantao"> | string | null
    cor?: StringNullableWithAggregatesFilter<"EquipePlantao"> | string | null
    ativo?: BoolWithAggregatesFilter<"EquipePlantao"> | boolean
    queueId?: IntNullableWithAggregatesFilter<"EquipePlantao"> | number | null
    queueName?: StringNullableWithAggregatesFilter<"EquipePlantao"> | string | null
    departamentos?: StringNullableListFilter<"EquipePlantao">
    isFallback?: BoolWithAggregatesFilter<"EquipePlantao"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"EquipePlantao"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EquipePlantao"> | Date | string
  }

  export type MembroEquipeWhereInput = {
    AND?: MembroEquipeWhereInput | MembroEquipeWhereInput[]
    OR?: MembroEquipeWhereInput[]
    NOT?: MembroEquipeWhereInput | MembroEquipeWhereInput[]
    id?: StringFilter<"MembroEquipe"> | string
    equipeId?: StringFilter<"MembroEquipe"> | string
    userId?: StringFilter<"MembroEquipe"> | string
    cargo?: StringNullableFilter<"MembroEquipe"> | string | null
    ordemSequencial?: IntFilter<"MembroEquipe"> | number
    ultimoAtendimentoEm?: DateTimeNullableFilter<"MembroEquipe"> | Date | string | null
    pesoPrioridade?: IntFilter<"MembroEquipe"> | number
    turnos?: JsonNullableFilter<"MembroEquipe">
    margemInicioMinutos?: IntFilter<"MembroEquipe"> | number
    margemFimMinutos?: IntFilter<"MembroEquipe"> | number
    ativo?: BoolFilter<"MembroEquipe"> | boolean
    createdAt?: DateTimeFilter<"MembroEquipe"> | Date | string
    updatedAt?: DateTimeFilter<"MembroEquipe"> | Date | string
    equipe?: XOR<EquipePlantaoScalarRelationFilter, EquipePlantaoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MembroEquipeOrderByWithRelationInput = {
    id?: SortOrder
    equipeId?: SortOrder
    userId?: SortOrder
    cargo?: SortOrderInput | SortOrder
    ordemSequencial?: SortOrder
    ultimoAtendimentoEm?: SortOrderInput | SortOrder
    pesoPrioridade?: SortOrder
    turnos?: SortOrderInput | SortOrder
    margemInicioMinutos?: SortOrder
    margemFimMinutos?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    equipe?: EquipePlantaoOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MembroEquipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    equipeId_userId?: MembroEquipeEquipeIdUserIdCompoundUniqueInput
    AND?: MembroEquipeWhereInput | MembroEquipeWhereInput[]
    OR?: MembroEquipeWhereInput[]
    NOT?: MembroEquipeWhereInput | MembroEquipeWhereInput[]
    equipeId?: StringFilter<"MembroEquipe"> | string
    userId?: StringFilter<"MembroEquipe"> | string
    cargo?: StringNullableFilter<"MembroEquipe"> | string | null
    ordemSequencial?: IntFilter<"MembroEquipe"> | number
    ultimoAtendimentoEm?: DateTimeNullableFilter<"MembroEquipe"> | Date | string | null
    pesoPrioridade?: IntFilter<"MembroEquipe"> | number
    turnos?: JsonNullableFilter<"MembroEquipe">
    margemInicioMinutos?: IntFilter<"MembroEquipe"> | number
    margemFimMinutos?: IntFilter<"MembroEquipe"> | number
    ativo?: BoolFilter<"MembroEquipe"> | boolean
    createdAt?: DateTimeFilter<"MembroEquipe"> | Date | string
    updatedAt?: DateTimeFilter<"MembroEquipe"> | Date | string
    equipe?: XOR<EquipePlantaoScalarRelationFilter, EquipePlantaoWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "equipeId_userId">

  export type MembroEquipeOrderByWithAggregationInput = {
    id?: SortOrder
    equipeId?: SortOrder
    userId?: SortOrder
    cargo?: SortOrderInput | SortOrder
    ordemSequencial?: SortOrder
    ultimoAtendimentoEm?: SortOrderInput | SortOrder
    pesoPrioridade?: SortOrder
    turnos?: SortOrderInput | SortOrder
    margemInicioMinutos?: SortOrder
    margemFimMinutos?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MembroEquipeCountOrderByAggregateInput
    _avg?: MembroEquipeAvgOrderByAggregateInput
    _max?: MembroEquipeMaxOrderByAggregateInput
    _min?: MembroEquipeMinOrderByAggregateInput
    _sum?: MembroEquipeSumOrderByAggregateInput
  }

  export type MembroEquipeScalarWhereWithAggregatesInput = {
    AND?: MembroEquipeScalarWhereWithAggregatesInput | MembroEquipeScalarWhereWithAggregatesInput[]
    OR?: MembroEquipeScalarWhereWithAggregatesInput[]
    NOT?: MembroEquipeScalarWhereWithAggregatesInput | MembroEquipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MembroEquipe"> | string
    equipeId?: StringWithAggregatesFilter<"MembroEquipe"> | string
    userId?: StringWithAggregatesFilter<"MembroEquipe"> | string
    cargo?: StringNullableWithAggregatesFilter<"MembroEquipe"> | string | null
    ordemSequencial?: IntWithAggregatesFilter<"MembroEquipe"> | number
    ultimoAtendimentoEm?: DateTimeNullableWithAggregatesFilter<"MembroEquipe"> | Date | string | null
    pesoPrioridade?: IntWithAggregatesFilter<"MembroEquipe"> | number
    turnos?: JsonNullableWithAggregatesFilter<"MembroEquipe">
    margemInicioMinutos?: IntWithAggregatesFilter<"MembroEquipe"> | number
    margemFimMinutos?: IntWithAggregatesFilter<"MembroEquipe"> | number
    ativo?: BoolWithAggregatesFilter<"MembroEquipe"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MembroEquipe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MembroEquipe"> | Date | string
  }

  export type PlantonistasWhereInput = {
    AND?: PlantonistasWhereInput | PlantonistasWhereInput[]
    OR?: PlantonistasWhereInput[]
    NOT?: PlantonistasWhereInput | PlantonistasWhereInput[]
    id?: StringFilter<"Plantonistas"> | string
    nome?: StringFilter<"Plantonistas"> | string
    posicao?: IntFilter<"Plantonistas"> | number
    proxima_data?: DateTimeNullableFilter<"Plantonistas"> | Date | string | null
    createdAt?: DateTimeFilter<"Plantonistas"> | Date | string
    updatedAt?: DateTimeFilter<"Plantonistas"> | Date | string
    userId?: StringFilter<"Plantonistas"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    registros?: RegistrosListRelationFilter
  }

  export type PlantonistasOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    posicao?: SortOrder
    proxima_data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    registros?: RegistrosOrderByRelationAggregateInput
  }

  export type PlantonistasWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PlantonistasWhereInput | PlantonistasWhereInput[]
    OR?: PlantonistasWhereInput[]
    NOT?: PlantonistasWhereInput | PlantonistasWhereInput[]
    nome?: StringFilter<"Plantonistas"> | string
    posicao?: IntFilter<"Plantonistas"> | number
    proxima_data?: DateTimeNullableFilter<"Plantonistas"> | Date | string | null
    createdAt?: DateTimeFilter<"Plantonistas"> | Date | string
    updatedAt?: DateTimeFilter<"Plantonistas"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    registros?: RegistrosListRelationFilter
  }, "id" | "userId">

  export type PlantonistasOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    posicao?: SortOrder
    proxima_data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: PlantonistasCountOrderByAggregateInput
    _avg?: PlantonistasAvgOrderByAggregateInput
    _max?: PlantonistasMaxOrderByAggregateInput
    _min?: PlantonistasMinOrderByAggregateInput
    _sum?: PlantonistasSumOrderByAggregateInput
  }

  export type PlantonistasScalarWhereWithAggregatesInput = {
    AND?: PlantonistasScalarWhereWithAggregatesInput | PlantonistasScalarWhereWithAggregatesInput[]
    OR?: PlantonistasScalarWhereWithAggregatesInput[]
    NOT?: PlantonistasScalarWhereWithAggregatesInput | PlantonistasScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plantonistas"> | string
    nome?: StringWithAggregatesFilter<"Plantonistas"> | string
    posicao?: IntWithAggregatesFilter<"Plantonistas"> | number
    proxima_data?: DateTimeNullableWithAggregatesFilter<"Plantonistas"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Plantonistas"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plantonistas"> | Date | string
    userId?: StringWithAggregatesFilter<"Plantonistas"> | string
  }

  export type RegistrosWhereInput = {
    AND?: RegistrosWhereInput | RegistrosWhereInput[]
    OR?: RegistrosWhereInput[]
    NOT?: RegistrosWhereInput | RegistrosWhereInput[]
    id?: StringFilter<"Registros"> | string
    plantao_id?: StringFilter<"Registros"> | string
    user_id?: StringFilter<"Registros"> | string
    data?: DateTimeFilter<"Registros"> | Date | string
    startTime?: DateTimeFilter<"Registros"> | Date | string
    endTime?: DateTimeFilter<"Registros"> | Date | string
    createdAt?: DateTimeFilter<"Registros"> | Date | string
    updatedAt?: DateTimeFilter<"Registros"> | Date | string
    plantao?: XOR<PlantonistasScalarRelationFilter, PlantonistasWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RegistrosOrderByWithRelationInput = {
    id?: SortOrder
    plantao_id?: SortOrder
    user_id?: SortOrder
    data?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plantao?: PlantonistasOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type RegistrosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RegistrosWhereInput | RegistrosWhereInput[]
    OR?: RegistrosWhereInput[]
    NOT?: RegistrosWhereInput | RegistrosWhereInput[]
    plantao_id?: StringFilter<"Registros"> | string
    user_id?: StringFilter<"Registros"> | string
    data?: DateTimeFilter<"Registros"> | Date | string
    startTime?: DateTimeFilter<"Registros"> | Date | string
    endTime?: DateTimeFilter<"Registros"> | Date | string
    createdAt?: DateTimeFilter<"Registros"> | Date | string
    updatedAt?: DateTimeFilter<"Registros"> | Date | string
    plantao?: XOR<PlantonistasScalarRelationFilter, PlantonistasWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RegistrosOrderByWithAggregationInput = {
    id?: SortOrder
    plantao_id?: SortOrder
    user_id?: SortOrder
    data?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RegistrosCountOrderByAggregateInput
    _max?: RegistrosMaxOrderByAggregateInput
    _min?: RegistrosMinOrderByAggregateInput
  }

  export type RegistrosScalarWhereWithAggregatesInput = {
    AND?: RegistrosScalarWhereWithAggregatesInput | RegistrosScalarWhereWithAggregatesInput[]
    OR?: RegistrosScalarWhereWithAggregatesInput[]
    NOT?: RegistrosScalarWhereWithAggregatesInput | RegistrosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Registros"> | string
    plantao_id?: StringWithAggregatesFilter<"Registros"> | string
    user_id?: StringWithAggregatesFilter<"Registros"> | string
    data?: DateTimeWithAggregatesFilter<"Registros"> | Date | string
    startTime?: DateTimeWithAggregatesFilter<"Registros"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Registros"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Registros"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Registros"> | Date | string
  }

  export type ExternalTokenWhereInput = {
    AND?: ExternalTokenWhereInput | ExternalTokenWhereInput[]
    OR?: ExternalTokenWhereInput[]
    NOT?: ExternalTokenWhereInput | ExternalTokenWhereInput[]
    id?: StringFilter<"ExternalToken"> | string
    serviceName?: StringFilter<"ExternalToken"> | string
    token?: StringFilter<"ExternalToken"> | string
    apiUrl?: StringNullableFilter<"ExternalToken"> | string | null
    description?: StringNullableFilter<"ExternalToken"> | string | null
    isActive?: BoolFilter<"ExternalToken"> | boolean
    createdAt?: DateTimeFilter<"ExternalToken"> | Date | string
    updatedAt?: DateTimeFilter<"ExternalToken"> | Date | string
  }

  export type ExternalTokenOrderByWithRelationInput = {
    id?: SortOrder
    serviceName?: SortOrder
    token?: SortOrder
    apiUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serviceName?: string
    AND?: ExternalTokenWhereInput | ExternalTokenWhereInput[]
    OR?: ExternalTokenWhereInput[]
    NOT?: ExternalTokenWhereInput | ExternalTokenWhereInput[]
    token?: StringFilter<"ExternalToken"> | string
    apiUrl?: StringNullableFilter<"ExternalToken"> | string | null
    description?: StringNullableFilter<"ExternalToken"> | string | null
    isActive?: BoolFilter<"ExternalToken"> | boolean
    createdAt?: DateTimeFilter<"ExternalToken"> | Date | string
    updatedAt?: DateTimeFilter<"ExternalToken"> | Date | string
  }, "id" | "serviceName">

  export type ExternalTokenOrderByWithAggregationInput = {
    id?: SortOrder
    serviceName?: SortOrder
    token?: SortOrder
    apiUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExternalTokenCountOrderByAggregateInput
    _max?: ExternalTokenMaxOrderByAggregateInput
    _min?: ExternalTokenMinOrderByAggregateInput
  }

  export type ExternalTokenScalarWhereWithAggregatesInput = {
    AND?: ExternalTokenScalarWhereWithAggregatesInput | ExternalTokenScalarWhereWithAggregatesInput[]
    OR?: ExternalTokenScalarWhereWithAggregatesInput[]
    NOT?: ExternalTokenScalarWhereWithAggregatesInput | ExternalTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExternalToken"> | string
    serviceName?: StringWithAggregatesFilter<"ExternalToken"> | string
    token?: StringWithAggregatesFilter<"ExternalToken"> | string
    apiUrl?: StringNullableWithAggregatesFilter<"ExternalToken"> | string | null
    description?: StringNullableWithAggregatesFilter<"ExternalToken"> | string | null
    isActive?: BoolWithAggregatesFilter<"ExternalToken"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ExternalToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExternalToken"> | Date | string
  }

  export type TomticketReportCacheWhereInput = {
    AND?: TomticketReportCacheWhereInput | TomticketReportCacheWhereInput[]
    OR?: TomticketReportCacheWhereInput[]
    NOT?: TomticketReportCacheWhereInput | TomticketReportCacheWhereInput[]
    id?: StringFilter<"TomticketReportCache"> | string
    startDate?: StringFilter<"TomticketReportCache"> | string
    endDate?: StringFilter<"TomticketReportCache"> | string
    data?: JsonFilter<"TomticketReportCache">
    createdAt?: DateTimeFilter<"TomticketReportCache"> | Date | string
    updatedAt?: DateTimeFilter<"TomticketReportCache"> | Date | string
  }

  export type TomticketReportCacheOrderByWithRelationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TomticketReportCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    startDate_endDate?: TomticketReportCacheStartDateEndDateCompoundUniqueInput
    AND?: TomticketReportCacheWhereInput | TomticketReportCacheWhereInput[]
    OR?: TomticketReportCacheWhereInput[]
    NOT?: TomticketReportCacheWhereInput | TomticketReportCacheWhereInput[]
    startDate?: StringFilter<"TomticketReportCache"> | string
    endDate?: StringFilter<"TomticketReportCache"> | string
    data?: JsonFilter<"TomticketReportCache">
    createdAt?: DateTimeFilter<"TomticketReportCache"> | Date | string
    updatedAt?: DateTimeFilter<"TomticketReportCache"> | Date | string
  }, "id" | "startDate_endDate">

  export type TomticketReportCacheOrderByWithAggregationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TomticketReportCacheCountOrderByAggregateInput
    _max?: TomticketReportCacheMaxOrderByAggregateInput
    _min?: TomticketReportCacheMinOrderByAggregateInput
  }

  export type TomticketReportCacheScalarWhereWithAggregatesInput = {
    AND?: TomticketReportCacheScalarWhereWithAggregatesInput | TomticketReportCacheScalarWhereWithAggregatesInput[]
    OR?: TomticketReportCacheScalarWhereWithAggregatesInput[]
    NOT?: TomticketReportCacheScalarWhereWithAggregatesInput | TomticketReportCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TomticketReportCache"> | string
    startDate?: StringWithAggregatesFilter<"TomticketReportCache"> | string
    endDate?: StringWithAggregatesFilter<"TomticketReportCache"> | string
    data?: JsonWithAggregatesFilter<"TomticketReportCache">
    createdAt?: DateTimeWithAggregatesFilter<"TomticketReportCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TomticketReportCache"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    pass?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: EnumNivelAcessoFilter<"User"> | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFilter<"User"> | $Enums.TipoUsuario
    id_atendente?: StringNullableFilter<"User"> | string | null
    zproId?: IntNullableFilter<"User"> | number | null
    slackId?: StringNullableFilter<"User"> | string | null
    isPlantonista?: BoolFilter<"User"> | boolean
    posicao?: IntNullableFilter<"User"> | number | null
    plantao?: XOR<PlantonistasNullableScalarRelationFilter, PlantonistasWhereInput> | null
    registros?: RegistrosListRelationFilter
    membrosEquipe?: MembroEquipeListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    pass?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    typeUser?: SortOrder
    id_atendente?: SortOrderInput | SortOrder
    zproId?: SortOrderInput | SortOrder
    slackId?: SortOrderInput | SortOrder
    isPlantonista?: SortOrder
    posicao?: SortOrderInput | SortOrder
    plantao?: PlantonistasOrderByWithRelationInput
    registros?: RegistrosOrderByRelationAggregateInput
    membrosEquipe?: MembroEquipeOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    id_atendente?: string
    zproId?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    pass?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: EnumNivelAcessoFilter<"User"> | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFilter<"User"> | $Enums.TipoUsuario
    slackId?: StringNullableFilter<"User"> | string | null
    isPlantonista?: BoolFilter<"User"> | boolean
    posicao?: IntNullableFilter<"User"> | number | null
    plantao?: XOR<PlantonistasNullableScalarRelationFilter, PlantonistasWhereInput> | null
    registros?: RegistrosListRelationFilter
    membrosEquipe?: MembroEquipeListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email" | "id_atendente" | "zproId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    pass?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    typeUser?: SortOrder
    id_atendente?: SortOrderInput | SortOrder
    zproId?: SortOrderInput | SortOrder
    slackId?: SortOrderInput | SortOrder
    isPlantonista?: SortOrder
    posicao?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    pass?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    role?: EnumNivelAcessoWithAggregatesFilter<"User"> | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioWithAggregatesFilter<"User"> | $Enums.TipoUsuario
    id_atendente?: StringNullableWithAggregatesFilter<"User"> | string | null
    zproId?: IntNullableWithAggregatesFilter<"User"> | number | null
    slackId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isPlantonista?: BoolWithAggregatesFilter<"User"> | boolean
    posicao?: IntNullableWithAggregatesFilter<"User"> | number | null
  }

  export type AtendimentoCreateInput = {
    id?: string
    ticketZpro?: string | null
    ticketTomticket?: string | null
    sincronizado?: boolean
    clienteId?: string | null
    cnpj?: string | null
    atendente?: string | null
    protocolo?: string | null
    nomeContato?: string | null
    tipoAtendimento?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoUncheckedCreateInput = {
    id?: string
    ticketZpro?: string | null
    ticketTomticket?: string | null
    sincronizado?: boolean
    clienteId?: string | null
    cnpj?: string | null
    atendente?: string | null
    protocolo?: string | null
    nomeContato?: string | null
    tipoAtendimento?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketZpro?: NullableStringFieldUpdateOperationsInput | string | null
    ticketTomticket?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado?: BoolFieldUpdateOperationsInput | boolean
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    atendente?: NullableStringFieldUpdateOperationsInput | string | null
    protocolo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeContato?: NullableStringFieldUpdateOperationsInput | string | null
    tipoAtendimento?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketZpro?: NullableStringFieldUpdateOperationsInput | string | null
    ticketTomticket?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado?: BoolFieldUpdateOperationsInput | boolean
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    atendente?: NullableStringFieldUpdateOperationsInput | string | null
    protocolo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeContato?: NullableStringFieldUpdateOperationsInput | string | null
    tipoAtendimento?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoCreateManyInput = {
    id?: string
    ticketZpro?: string | null
    ticketTomticket?: string | null
    sincronizado?: boolean
    clienteId?: string | null
    cnpj?: string | null
    atendente?: string | null
    protocolo?: string | null
    nomeContato?: string | null
    tipoAtendimento?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AtendimentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketZpro?: NullableStringFieldUpdateOperationsInput | string | null
    ticketTomticket?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado?: BoolFieldUpdateOperationsInput | boolean
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    atendente?: NullableStringFieldUpdateOperationsInput | string | null
    protocolo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeContato?: NullableStringFieldUpdateOperationsInput | string | null
    tipoAtendimento?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AtendimentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketZpro?: NullableStringFieldUpdateOperationsInput | string | null
    ticketTomticket?: NullableStringFieldUpdateOperationsInput | string | null
    sincronizado?: BoolFieldUpdateOperationsInput | boolean
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    atendente?: NullableStringFieldUpdateOperationsInput | string | null
    protocolo?: NullableStringFieldUpdateOperationsInput | string | null
    nomeContato?: NullableStringFieldUpdateOperationsInput | string | null
    tipoAtendimento?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    issuer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    issuer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    issuer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EquipePlantaoCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    cor?: string | null
    ativo?: boolean
    queueId?: number | null
    queueName?: string | null
    departamentos?: EquipePlantaoCreatedepartamentosInput | string[]
    isFallback?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    membros?: MembroEquipeCreateNestedManyWithoutEquipeInput
  }

  export type EquipePlantaoUncheckedCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    cor?: string | null
    ativo?: boolean
    queueId?: number | null
    queueName?: string | null
    departamentos?: EquipePlantaoCreatedepartamentosInput | string[]
    isFallback?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    membros?: MembroEquipeUncheckedCreateNestedManyWithoutEquipeInput
  }

  export type EquipePlantaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cor?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    queueId?: NullableIntFieldUpdateOperationsInput | number | null
    queueName?: NullableStringFieldUpdateOperationsInput | string | null
    departamentos?: EquipePlantaoUpdatedepartamentosInput | string[]
    isFallback?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: MembroEquipeUpdateManyWithoutEquipeNestedInput
  }

  export type EquipePlantaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cor?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    queueId?: NullableIntFieldUpdateOperationsInput | number | null
    queueName?: NullableStringFieldUpdateOperationsInput | string | null
    departamentos?: EquipePlantaoUpdatedepartamentosInput | string[]
    isFallback?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membros?: MembroEquipeUncheckedUpdateManyWithoutEquipeNestedInput
  }

  export type EquipePlantaoCreateManyInput = {
    id?: string
    nome: string
    descricao?: string | null
    cor?: string | null
    ativo?: boolean
    queueId?: number | null
    queueName?: string | null
    departamentos?: EquipePlantaoCreatedepartamentosInput | string[]
    isFallback?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipePlantaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cor?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    queueId?: NullableIntFieldUpdateOperationsInput | number | null
    queueName?: NullableStringFieldUpdateOperationsInput | string | null
    departamentos?: EquipePlantaoUpdatedepartamentosInput | string[]
    isFallback?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipePlantaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cor?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    queueId?: NullableIntFieldUpdateOperationsInput | number | null
    queueName?: NullableStringFieldUpdateOperationsInput | string | null
    departamentos?: EquipePlantaoUpdatedepartamentosInput | string[]
    isFallback?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembroEquipeCreateInput = {
    id?: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    equipe: EquipePlantaoCreateNestedOneWithoutMembrosInput
    user: UserCreateNestedOneWithoutMembrosEquipeInput
  }

  export type MembroEquipeUncheckedCreateInput = {
    id?: string
    equipeId: string
    userId: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembroEquipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    equipe?: EquipePlantaoUpdateOneRequiredWithoutMembrosNestedInput
    user?: UserUpdateOneRequiredWithoutMembrosEquipeNestedInput
  }

  export type MembroEquipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembroEquipeCreateManyInput = {
    id?: string
    equipeId: string
    userId: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembroEquipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembroEquipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlantonistasCreateInput = {
    id?: string
    nome: string
    posicao?: number
    proxima_data?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlantaoInput
    registros?: RegistrosCreateNestedManyWithoutPlantaoInput
  }

  export type PlantonistasUncheckedCreateInput = {
    id?: string
    nome: string
    posicao?: number
    proxima_data?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    registros?: RegistrosUncheckedCreateNestedManyWithoutPlantaoInput
  }

  export type PlantonistasUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlantaoNestedInput
    registros?: RegistrosUpdateManyWithoutPlantaoNestedInput
  }

  export type PlantonistasUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    registros?: RegistrosUncheckedUpdateManyWithoutPlantaoNestedInput
  }

  export type PlantonistasCreateManyInput = {
    id?: string
    nome: string
    posicao?: number
    proxima_data?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type PlantonistasUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlantonistasUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RegistrosCreateInput = {
    id?: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    plantao: PlantonistasCreateNestedOneWithoutRegistrosInput
    user: UserCreateNestedOneWithoutRegistrosInput
  }

  export type RegistrosUncheckedCreateInput = {
    id?: string
    plantao_id: string
    user_id: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plantao?: PlantonistasUpdateOneRequiredWithoutRegistrosNestedInput
    user?: UserUpdateOneRequiredWithoutRegistrosNestedInput
  }

  export type RegistrosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantao_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrosCreateManyInput = {
    id?: string
    plantao_id: string
    user_id: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantao_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalTokenCreateInput = {
    id?: string
    serviceName: string
    token: string
    apiUrl?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExternalTokenUncheckedCreateInput = {
    id?: string
    serviceName: string
    token: string
    apiUrl?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExternalTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    apiUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    apiUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalTokenCreateManyInput = {
    id?: string
    serviceName: string
    token: string
    apiUrl?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExternalTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    apiUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    apiUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TomticketReportCacheCreateInput = {
    id?: string
    startDate: string
    endDate: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TomticketReportCacheUncheckedCreateInput = {
    id?: string
    startDate: string
    endDate: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TomticketReportCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TomticketReportCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TomticketReportCacheCreateManyInput = {
    id?: string
    startDate: string
    endDate: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TomticketReportCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TomticketReportCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasCreateNestedOneWithoutUserInput
    registros?: RegistrosCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasUncheckedCreateNestedOneWithoutUserInput
    registros?: RegistrosUncheckedCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUpdateOneWithoutUserNestedInput
    registros?: RegistrosUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUncheckedUpdateOneWithoutUserNestedInput
    registros?: RegistrosUncheckedUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AtendimentoCountOrderByAggregateInput = {
    id?: SortOrder
    ticketZpro?: SortOrder
    ticketTomticket?: SortOrder
    sincronizado?: SortOrder
    clienteId?: SortOrder
    cnpj?: SortOrder
    atendente?: SortOrder
    protocolo?: SortOrder
    nomeContato?: SortOrder
    tipoAtendimento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AtendimentoMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketZpro?: SortOrder
    ticketTomticket?: SortOrder
    sincronizado?: SortOrder
    clienteId?: SortOrder
    cnpj?: SortOrder
    atendente?: SortOrder
    protocolo?: SortOrder
    nomeContato?: SortOrder
    tipoAtendimento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AtendimentoMinOrderByAggregateInput = {
    id?: SortOrder
    ticketZpro?: SortOrder
    ticketTomticket?: SortOrder
    sincronizado?: SortOrder
    clienteId?: SortOrder
    cnpj?: SortOrder
    atendente?: SortOrder
    protocolo?: SortOrder
    nomeContato?: SortOrder
    tipoAtendimento?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    issuer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    issuer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    issuer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type MembroEquipeListRelationFilter = {
    every?: MembroEquipeWhereInput
    some?: MembroEquipeWhereInput
    none?: MembroEquipeWhereInput
  }

  export type MembroEquipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EquipePlantaoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cor?: SortOrder
    ativo?: SortOrder
    queueId?: SortOrder
    queueName?: SortOrder
    departamentos?: SortOrder
    isFallback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipePlantaoAvgOrderByAggregateInput = {
    queueId?: SortOrder
  }

  export type EquipePlantaoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cor?: SortOrder
    ativo?: SortOrder
    queueId?: SortOrder
    queueName?: SortOrder
    isFallback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipePlantaoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cor?: SortOrder
    ativo?: SortOrder
    queueId?: SortOrder
    queueName?: SortOrder
    isFallback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipePlantaoSumOrderByAggregateInput = {
    queueId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EquipePlantaoScalarRelationFilter = {
    is?: EquipePlantaoWhereInput
    isNot?: EquipePlantaoWhereInput
  }

  export type MembroEquipeEquipeIdUserIdCompoundUniqueInput = {
    equipeId: string
    userId: string
  }

  export type MembroEquipeCountOrderByAggregateInput = {
    id?: SortOrder
    equipeId?: SortOrder
    userId?: SortOrder
    cargo?: SortOrder
    ordemSequencial?: SortOrder
    ultimoAtendimentoEm?: SortOrder
    pesoPrioridade?: SortOrder
    turnos?: SortOrder
    margemInicioMinutos?: SortOrder
    margemFimMinutos?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembroEquipeAvgOrderByAggregateInput = {
    ordemSequencial?: SortOrder
    pesoPrioridade?: SortOrder
    margemInicioMinutos?: SortOrder
    margemFimMinutos?: SortOrder
  }

  export type MembroEquipeMaxOrderByAggregateInput = {
    id?: SortOrder
    equipeId?: SortOrder
    userId?: SortOrder
    cargo?: SortOrder
    ordemSequencial?: SortOrder
    ultimoAtendimentoEm?: SortOrder
    pesoPrioridade?: SortOrder
    margemInicioMinutos?: SortOrder
    margemFimMinutos?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembroEquipeMinOrderByAggregateInput = {
    id?: SortOrder
    equipeId?: SortOrder
    userId?: SortOrder
    cargo?: SortOrder
    ordemSequencial?: SortOrder
    ultimoAtendimentoEm?: SortOrder
    pesoPrioridade?: SortOrder
    margemInicioMinutos?: SortOrder
    margemFimMinutos?: SortOrder
    ativo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembroEquipeSumOrderByAggregateInput = {
    ordemSequencial?: SortOrder
    pesoPrioridade?: SortOrder
    margemInicioMinutos?: SortOrder
    margemFimMinutos?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type RegistrosListRelationFilter = {
    every?: RegistrosWhereInput
    some?: RegistrosWhereInput
    none?: RegistrosWhereInput
  }

  export type RegistrosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlantonistasCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    posicao?: SortOrder
    proxima_data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PlantonistasAvgOrderByAggregateInput = {
    posicao?: SortOrder
  }

  export type PlantonistasMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    posicao?: SortOrder
    proxima_data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PlantonistasMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    posicao?: SortOrder
    proxima_data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PlantonistasSumOrderByAggregateInput = {
    posicao?: SortOrder
  }

  export type PlantonistasScalarRelationFilter = {
    is?: PlantonistasWhereInput
    isNot?: PlantonistasWhereInput
  }

  export type RegistrosCountOrderByAggregateInput = {
    id?: SortOrder
    plantao_id?: SortOrder
    user_id?: SortOrder
    data?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegistrosMaxOrderByAggregateInput = {
    id?: SortOrder
    plantao_id?: SortOrder
    user_id?: SortOrder
    data?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegistrosMinOrderByAggregateInput = {
    id?: SortOrder
    plantao_id?: SortOrder
    user_id?: SortOrder
    data?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalTokenCountOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    token?: SortOrder
    apiUrl?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    token?: SortOrder
    apiUrl?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalTokenMinOrderByAggregateInput = {
    id?: SortOrder
    serviceName?: SortOrder
    token?: SortOrder
    apiUrl?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TomticketReportCacheStartDateEndDateCompoundUniqueInput = {
    startDate: string
    endDate: string
  }

  export type TomticketReportCacheCountOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TomticketReportCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TomticketReportCacheMinOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumNivelAcessoFilter<$PrismaModel = never> = {
    equals?: $Enums.NivelAcesso | EnumNivelAcessoFieldRefInput<$PrismaModel>
    in?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    notIn?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    not?: NestedEnumNivelAcessoFilter<$PrismaModel> | $Enums.NivelAcesso
  }

  export type EnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type PlantonistasNullableScalarRelationFilter = {
    is?: PlantonistasWhereInput | null
    isNot?: PlantonistasWhereInput | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    pass?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    typeUser?: SortOrder
    id_atendente?: SortOrder
    zproId?: SortOrder
    slackId?: SortOrder
    isPlantonista?: SortOrder
    posicao?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    zproId?: SortOrder
    posicao?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    pass?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    typeUser?: SortOrder
    id_atendente?: SortOrder
    zproId?: SortOrder
    slackId?: SortOrder
    isPlantonista?: SortOrder
    posicao?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    pass?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    typeUser?: SortOrder
    id_atendente?: SortOrder
    zproId?: SortOrder
    slackId?: SortOrder
    isPlantonista?: SortOrder
    posicao?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    zproId?: SortOrder
    posicao?: SortOrder
  }

  export type EnumNivelAcessoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NivelAcesso | EnumNivelAcessoFieldRefInput<$PrismaModel>
    in?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    notIn?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    not?: NestedEnumNivelAcessoWithAggregatesFilter<$PrismaModel> | $Enums.NivelAcesso
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNivelAcessoFilter<$PrismaModel>
    _max?: NestedEnumNivelAcessoFilter<$PrismaModel>
  }

  export type EnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type EquipePlantaoCreatedepartamentosInput = {
    set: string[]
  }

  export type MembroEquipeCreateNestedManyWithoutEquipeInput = {
    create?: XOR<MembroEquipeCreateWithoutEquipeInput, MembroEquipeUncheckedCreateWithoutEquipeInput> | MembroEquipeCreateWithoutEquipeInput[] | MembroEquipeUncheckedCreateWithoutEquipeInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutEquipeInput | MembroEquipeCreateOrConnectWithoutEquipeInput[]
    createMany?: MembroEquipeCreateManyEquipeInputEnvelope
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
  }

  export type MembroEquipeUncheckedCreateNestedManyWithoutEquipeInput = {
    create?: XOR<MembroEquipeCreateWithoutEquipeInput, MembroEquipeUncheckedCreateWithoutEquipeInput> | MembroEquipeCreateWithoutEquipeInput[] | MembroEquipeUncheckedCreateWithoutEquipeInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutEquipeInput | MembroEquipeCreateOrConnectWithoutEquipeInput[]
    createMany?: MembroEquipeCreateManyEquipeInputEnvelope
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EquipePlantaoUpdatedepartamentosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MembroEquipeUpdateManyWithoutEquipeNestedInput = {
    create?: XOR<MembroEquipeCreateWithoutEquipeInput, MembroEquipeUncheckedCreateWithoutEquipeInput> | MembroEquipeCreateWithoutEquipeInput[] | MembroEquipeUncheckedCreateWithoutEquipeInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutEquipeInput | MembroEquipeCreateOrConnectWithoutEquipeInput[]
    upsert?: MembroEquipeUpsertWithWhereUniqueWithoutEquipeInput | MembroEquipeUpsertWithWhereUniqueWithoutEquipeInput[]
    createMany?: MembroEquipeCreateManyEquipeInputEnvelope
    set?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    disconnect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    delete?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    update?: MembroEquipeUpdateWithWhereUniqueWithoutEquipeInput | MembroEquipeUpdateWithWhereUniqueWithoutEquipeInput[]
    updateMany?: MembroEquipeUpdateManyWithWhereWithoutEquipeInput | MembroEquipeUpdateManyWithWhereWithoutEquipeInput[]
    deleteMany?: MembroEquipeScalarWhereInput | MembroEquipeScalarWhereInput[]
  }

  export type MembroEquipeUncheckedUpdateManyWithoutEquipeNestedInput = {
    create?: XOR<MembroEquipeCreateWithoutEquipeInput, MembroEquipeUncheckedCreateWithoutEquipeInput> | MembroEquipeCreateWithoutEquipeInput[] | MembroEquipeUncheckedCreateWithoutEquipeInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutEquipeInput | MembroEquipeCreateOrConnectWithoutEquipeInput[]
    upsert?: MembroEquipeUpsertWithWhereUniqueWithoutEquipeInput | MembroEquipeUpsertWithWhereUniqueWithoutEquipeInput[]
    createMany?: MembroEquipeCreateManyEquipeInputEnvelope
    set?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    disconnect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    delete?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    update?: MembroEquipeUpdateWithWhereUniqueWithoutEquipeInput | MembroEquipeUpdateWithWhereUniqueWithoutEquipeInput[]
    updateMany?: MembroEquipeUpdateManyWithWhereWithoutEquipeInput | MembroEquipeUpdateManyWithWhereWithoutEquipeInput[]
    deleteMany?: MembroEquipeScalarWhereInput | MembroEquipeScalarWhereInput[]
  }

  export type EquipePlantaoCreateNestedOneWithoutMembrosInput = {
    create?: XOR<EquipePlantaoCreateWithoutMembrosInput, EquipePlantaoUncheckedCreateWithoutMembrosInput>
    connectOrCreate?: EquipePlantaoCreateOrConnectWithoutMembrosInput
    connect?: EquipePlantaoWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembrosEquipeInput = {
    create?: XOR<UserCreateWithoutMembrosEquipeInput, UserUncheckedCreateWithoutMembrosEquipeInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembrosEquipeInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EquipePlantaoUpdateOneRequiredWithoutMembrosNestedInput = {
    create?: XOR<EquipePlantaoCreateWithoutMembrosInput, EquipePlantaoUncheckedCreateWithoutMembrosInput>
    connectOrCreate?: EquipePlantaoCreateOrConnectWithoutMembrosInput
    upsert?: EquipePlantaoUpsertWithoutMembrosInput
    connect?: EquipePlantaoWhereUniqueInput
    update?: XOR<XOR<EquipePlantaoUpdateToOneWithWhereWithoutMembrosInput, EquipePlantaoUpdateWithoutMembrosInput>, EquipePlantaoUncheckedUpdateWithoutMembrosInput>
  }

  export type UserUpdateOneRequiredWithoutMembrosEquipeNestedInput = {
    create?: XOR<UserCreateWithoutMembrosEquipeInput, UserUncheckedCreateWithoutMembrosEquipeInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembrosEquipeInput
    upsert?: UserUpsertWithoutMembrosEquipeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembrosEquipeInput, UserUpdateWithoutMembrosEquipeInput>, UserUncheckedUpdateWithoutMembrosEquipeInput>
  }

  export type UserCreateNestedOneWithoutPlantaoInput = {
    create?: XOR<UserCreateWithoutPlantaoInput, UserUncheckedCreateWithoutPlantaoInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlantaoInput
    connect?: UserWhereUniqueInput
  }

  export type RegistrosCreateNestedManyWithoutPlantaoInput = {
    create?: XOR<RegistrosCreateWithoutPlantaoInput, RegistrosUncheckedCreateWithoutPlantaoInput> | RegistrosCreateWithoutPlantaoInput[] | RegistrosUncheckedCreateWithoutPlantaoInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutPlantaoInput | RegistrosCreateOrConnectWithoutPlantaoInput[]
    createMany?: RegistrosCreateManyPlantaoInputEnvelope
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
  }

  export type RegistrosUncheckedCreateNestedManyWithoutPlantaoInput = {
    create?: XOR<RegistrosCreateWithoutPlantaoInput, RegistrosUncheckedCreateWithoutPlantaoInput> | RegistrosCreateWithoutPlantaoInput[] | RegistrosUncheckedCreateWithoutPlantaoInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutPlantaoInput | RegistrosCreateOrConnectWithoutPlantaoInput[]
    createMany?: RegistrosCreateManyPlantaoInputEnvelope
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPlantaoNestedInput = {
    create?: XOR<UserCreateWithoutPlantaoInput, UserUncheckedCreateWithoutPlantaoInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlantaoInput
    upsert?: UserUpsertWithoutPlantaoInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlantaoInput, UserUpdateWithoutPlantaoInput>, UserUncheckedUpdateWithoutPlantaoInput>
  }

  export type RegistrosUpdateManyWithoutPlantaoNestedInput = {
    create?: XOR<RegistrosCreateWithoutPlantaoInput, RegistrosUncheckedCreateWithoutPlantaoInput> | RegistrosCreateWithoutPlantaoInput[] | RegistrosUncheckedCreateWithoutPlantaoInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutPlantaoInput | RegistrosCreateOrConnectWithoutPlantaoInput[]
    upsert?: RegistrosUpsertWithWhereUniqueWithoutPlantaoInput | RegistrosUpsertWithWhereUniqueWithoutPlantaoInput[]
    createMany?: RegistrosCreateManyPlantaoInputEnvelope
    set?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    disconnect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    delete?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    update?: RegistrosUpdateWithWhereUniqueWithoutPlantaoInput | RegistrosUpdateWithWhereUniqueWithoutPlantaoInput[]
    updateMany?: RegistrosUpdateManyWithWhereWithoutPlantaoInput | RegistrosUpdateManyWithWhereWithoutPlantaoInput[]
    deleteMany?: RegistrosScalarWhereInput | RegistrosScalarWhereInput[]
  }

  export type RegistrosUncheckedUpdateManyWithoutPlantaoNestedInput = {
    create?: XOR<RegistrosCreateWithoutPlantaoInput, RegistrosUncheckedCreateWithoutPlantaoInput> | RegistrosCreateWithoutPlantaoInput[] | RegistrosUncheckedCreateWithoutPlantaoInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutPlantaoInput | RegistrosCreateOrConnectWithoutPlantaoInput[]
    upsert?: RegistrosUpsertWithWhereUniqueWithoutPlantaoInput | RegistrosUpsertWithWhereUniqueWithoutPlantaoInput[]
    createMany?: RegistrosCreateManyPlantaoInputEnvelope
    set?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    disconnect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    delete?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    update?: RegistrosUpdateWithWhereUniqueWithoutPlantaoInput | RegistrosUpdateWithWhereUniqueWithoutPlantaoInput[]
    updateMany?: RegistrosUpdateManyWithWhereWithoutPlantaoInput | RegistrosUpdateManyWithWhereWithoutPlantaoInput[]
    deleteMany?: RegistrosScalarWhereInput | RegistrosScalarWhereInput[]
  }

  export type PlantonistasCreateNestedOneWithoutRegistrosInput = {
    create?: XOR<PlantonistasCreateWithoutRegistrosInput, PlantonistasUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: PlantonistasCreateOrConnectWithoutRegistrosInput
    connect?: PlantonistasWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRegistrosInput = {
    create?: XOR<UserCreateWithoutRegistrosInput, UserUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: UserCreateOrConnectWithoutRegistrosInput
    connect?: UserWhereUniqueInput
  }

  export type PlantonistasUpdateOneRequiredWithoutRegistrosNestedInput = {
    create?: XOR<PlantonistasCreateWithoutRegistrosInput, PlantonistasUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: PlantonistasCreateOrConnectWithoutRegistrosInput
    upsert?: PlantonistasUpsertWithoutRegistrosInput
    connect?: PlantonistasWhereUniqueInput
    update?: XOR<XOR<PlantonistasUpdateToOneWithWhereWithoutRegistrosInput, PlantonistasUpdateWithoutRegistrosInput>, PlantonistasUncheckedUpdateWithoutRegistrosInput>
  }

  export type UserUpdateOneRequiredWithoutRegistrosNestedInput = {
    create?: XOR<UserCreateWithoutRegistrosInput, UserUncheckedCreateWithoutRegistrosInput>
    connectOrCreate?: UserCreateOrConnectWithoutRegistrosInput
    upsert?: UserUpsertWithoutRegistrosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRegistrosInput, UserUpdateWithoutRegistrosInput>, UserUncheckedUpdateWithoutRegistrosInput>
  }

  export type PlantonistasCreateNestedOneWithoutUserInput = {
    create?: XOR<PlantonistasCreateWithoutUserInput, PlantonistasUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlantonistasCreateOrConnectWithoutUserInput
    connect?: PlantonistasWhereUniqueInput
  }

  export type RegistrosCreateNestedManyWithoutUserInput = {
    create?: XOR<RegistrosCreateWithoutUserInput, RegistrosUncheckedCreateWithoutUserInput> | RegistrosCreateWithoutUserInput[] | RegistrosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutUserInput | RegistrosCreateOrConnectWithoutUserInput[]
    createMany?: RegistrosCreateManyUserInputEnvelope
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
  }

  export type MembroEquipeCreateNestedManyWithoutUserInput = {
    create?: XOR<MembroEquipeCreateWithoutUserInput, MembroEquipeUncheckedCreateWithoutUserInput> | MembroEquipeCreateWithoutUserInput[] | MembroEquipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutUserInput | MembroEquipeCreateOrConnectWithoutUserInput[]
    createMany?: MembroEquipeCreateManyUserInputEnvelope
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PlantonistasUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PlantonistasCreateWithoutUserInput, PlantonistasUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlantonistasCreateOrConnectWithoutUserInput
    connect?: PlantonistasWhereUniqueInput
  }

  export type RegistrosUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RegistrosCreateWithoutUserInput, RegistrosUncheckedCreateWithoutUserInput> | RegistrosCreateWithoutUserInput[] | RegistrosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutUserInput | RegistrosCreateOrConnectWithoutUserInput[]
    createMany?: RegistrosCreateManyUserInputEnvelope
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
  }

  export type MembroEquipeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MembroEquipeCreateWithoutUserInput, MembroEquipeUncheckedCreateWithoutUserInput> | MembroEquipeCreateWithoutUserInput[] | MembroEquipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutUserInput | MembroEquipeCreateOrConnectWithoutUserInput[]
    createMany?: MembroEquipeCreateManyUserInputEnvelope
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type EnumNivelAcessoFieldUpdateOperationsInput = {
    set?: $Enums.NivelAcesso
  }

  export type EnumTipoUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.TipoUsuario
  }

  export type PlantonistasUpdateOneWithoutUserNestedInput = {
    create?: XOR<PlantonistasCreateWithoutUserInput, PlantonistasUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlantonistasCreateOrConnectWithoutUserInput
    upsert?: PlantonistasUpsertWithoutUserInput
    disconnect?: PlantonistasWhereInput | boolean
    delete?: PlantonistasWhereInput | boolean
    connect?: PlantonistasWhereUniqueInput
    update?: XOR<XOR<PlantonistasUpdateToOneWithWhereWithoutUserInput, PlantonistasUpdateWithoutUserInput>, PlantonistasUncheckedUpdateWithoutUserInput>
  }

  export type RegistrosUpdateManyWithoutUserNestedInput = {
    create?: XOR<RegistrosCreateWithoutUserInput, RegistrosUncheckedCreateWithoutUserInput> | RegistrosCreateWithoutUserInput[] | RegistrosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutUserInput | RegistrosCreateOrConnectWithoutUserInput[]
    upsert?: RegistrosUpsertWithWhereUniqueWithoutUserInput | RegistrosUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RegistrosCreateManyUserInputEnvelope
    set?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    disconnect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    delete?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    update?: RegistrosUpdateWithWhereUniqueWithoutUserInput | RegistrosUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RegistrosUpdateManyWithWhereWithoutUserInput | RegistrosUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RegistrosScalarWhereInput | RegistrosScalarWhereInput[]
  }

  export type MembroEquipeUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembroEquipeCreateWithoutUserInput, MembroEquipeUncheckedCreateWithoutUserInput> | MembroEquipeCreateWithoutUserInput[] | MembroEquipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutUserInput | MembroEquipeCreateOrConnectWithoutUserInput[]
    upsert?: MembroEquipeUpsertWithWhereUniqueWithoutUserInput | MembroEquipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembroEquipeCreateManyUserInputEnvelope
    set?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    disconnect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    delete?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    update?: MembroEquipeUpdateWithWhereUniqueWithoutUserInput | MembroEquipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembroEquipeUpdateManyWithWhereWithoutUserInput | MembroEquipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembroEquipeScalarWhereInput | MembroEquipeScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PlantonistasUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PlantonistasCreateWithoutUserInput, PlantonistasUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlantonistasCreateOrConnectWithoutUserInput
    upsert?: PlantonistasUpsertWithoutUserInput
    disconnect?: PlantonistasWhereInput | boolean
    delete?: PlantonistasWhereInput | boolean
    connect?: PlantonistasWhereUniqueInput
    update?: XOR<XOR<PlantonistasUpdateToOneWithWhereWithoutUserInput, PlantonistasUpdateWithoutUserInput>, PlantonistasUncheckedUpdateWithoutUserInput>
  }

  export type RegistrosUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RegistrosCreateWithoutUserInput, RegistrosUncheckedCreateWithoutUserInput> | RegistrosCreateWithoutUserInput[] | RegistrosUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrosCreateOrConnectWithoutUserInput | RegistrosCreateOrConnectWithoutUserInput[]
    upsert?: RegistrosUpsertWithWhereUniqueWithoutUserInput | RegistrosUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RegistrosCreateManyUserInputEnvelope
    set?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    disconnect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    delete?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    connect?: RegistrosWhereUniqueInput | RegistrosWhereUniqueInput[]
    update?: RegistrosUpdateWithWhereUniqueWithoutUserInput | RegistrosUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RegistrosUpdateManyWithWhereWithoutUserInput | RegistrosUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RegistrosScalarWhereInput | RegistrosScalarWhereInput[]
  }

  export type MembroEquipeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembroEquipeCreateWithoutUserInput, MembroEquipeUncheckedCreateWithoutUserInput> | MembroEquipeCreateWithoutUserInput[] | MembroEquipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembroEquipeCreateOrConnectWithoutUserInput | MembroEquipeCreateOrConnectWithoutUserInput[]
    upsert?: MembroEquipeUpsertWithWhereUniqueWithoutUserInput | MembroEquipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembroEquipeCreateManyUserInputEnvelope
    set?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    disconnect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    delete?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    connect?: MembroEquipeWhereUniqueInput | MembroEquipeWhereUniqueInput[]
    update?: MembroEquipeUpdateWithWhereUniqueWithoutUserInput | MembroEquipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembroEquipeUpdateManyWithWhereWithoutUserInput | MembroEquipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembroEquipeScalarWhereInput | MembroEquipeScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumNivelAcessoFilter<$PrismaModel = never> = {
    equals?: $Enums.NivelAcesso | EnumNivelAcessoFieldRefInput<$PrismaModel>
    in?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    notIn?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    not?: NestedEnumNivelAcessoFilter<$PrismaModel> | $Enums.NivelAcesso
  }

  export type NestedEnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type NestedEnumNivelAcessoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NivelAcesso | EnumNivelAcessoFieldRefInput<$PrismaModel>
    in?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    notIn?: $Enums.NivelAcesso[] | ListEnumNivelAcessoFieldRefInput<$PrismaModel>
    not?: NestedEnumNivelAcessoWithAggregatesFilter<$PrismaModel> | $Enums.NivelAcesso
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNivelAcessoFilter<$PrismaModel>
    _max?: NestedEnumNivelAcessoFilter<$PrismaModel>
  }

  export type NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasCreateNestedOneWithoutUserInput
    registros?: RegistrosCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasUncheckedCreateNestedOneWithoutUserInput
    registros?: RegistrosUncheckedCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUpdateOneWithoutUserNestedInput
    registros?: RegistrosUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUncheckedUpdateOneWithoutUserNestedInput
    registros?: RegistrosUncheckedUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasCreateNestedOneWithoutUserInput
    registros?: RegistrosCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasUncheckedCreateNestedOneWithoutUserInput
    registros?: RegistrosUncheckedCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUpdateOneWithoutUserNestedInput
    registros?: RegistrosUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUncheckedUpdateOneWithoutUserNestedInput
    registros?: RegistrosUncheckedUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MembroEquipeCreateWithoutEquipeInput = {
    id?: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembrosEquipeInput
  }

  export type MembroEquipeUncheckedCreateWithoutEquipeInput = {
    id?: string
    userId: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembroEquipeCreateOrConnectWithoutEquipeInput = {
    where: MembroEquipeWhereUniqueInput
    create: XOR<MembroEquipeCreateWithoutEquipeInput, MembroEquipeUncheckedCreateWithoutEquipeInput>
  }

  export type MembroEquipeCreateManyEquipeInputEnvelope = {
    data: MembroEquipeCreateManyEquipeInput | MembroEquipeCreateManyEquipeInput[]
    skipDuplicates?: boolean
  }

  export type MembroEquipeUpsertWithWhereUniqueWithoutEquipeInput = {
    where: MembroEquipeWhereUniqueInput
    update: XOR<MembroEquipeUpdateWithoutEquipeInput, MembroEquipeUncheckedUpdateWithoutEquipeInput>
    create: XOR<MembroEquipeCreateWithoutEquipeInput, MembroEquipeUncheckedCreateWithoutEquipeInput>
  }

  export type MembroEquipeUpdateWithWhereUniqueWithoutEquipeInput = {
    where: MembroEquipeWhereUniqueInput
    data: XOR<MembroEquipeUpdateWithoutEquipeInput, MembroEquipeUncheckedUpdateWithoutEquipeInput>
  }

  export type MembroEquipeUpdateManyWithWhereWithoutEquipeInput = {
    where: MembroEquipeScalarWhereInput
    data: XOR<MembroEquipeUpdateManyMutationInput, MembroEquipeUncheckedUpdateManyWithoutEquipeInput>
  }

  export type MembroEquipeScalarWhereInput = {
    AND?: MembroEquipeScalarWhereInput | MembroEquipeScalarWhereInput[]
    OR?: MembroEquipeScalarWhereInput[]
    NOT?: MembroEquipeScalarWhereInput | MembroEquipeScalarWhereInput[]
    id?: StringFilter<"MembroEquipe"> | string
    equipeId?: StringFilter<"MembroEquipe"> | string
    userId?: StringFilter<"MembroEquipe"> | string
    cargo?: StringNullableFilter<"MembroEquipe"> | string | null
    ordemSequencial?: IntFilter<"MembroEquipe"> | number
    ultimoAtendimentoEm?: DateTimeNullableFilter<"MembroEquipe"> | Date | string | null
    pesoPrioridade?: IntFilter<"MembroEquipe"> | number
    turnos?: JsonNullableFilter<"MembroEquipe">
    margemInicioMinutos?: IntFilter<"MembroEquipe"> | number
    margemFimMinutos?: IntFilter<"MembroEquipe"> | number
    ativo?: BoolFilter<"MembroEquipe"> | boolean
    createdAt?: DateTimeFilter<"MembroEquipe"> | Date | string
    updatedAt?: DateTimeFilter<"MembroEquipe"> | Date | string
  }

  export type EquipePlantaoCreateWithoutMembrosInput = {
    id?: string
    nome: string
    descricao?: string | null
    cor?: string | null
    ativo?: boolean
    queueId?: number | null
    queueName?: string | null
    departamentos?: EquipePlantaoCreatedepartamentosInput | string[]
    isFallback?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipePlantaoUncheckedCreateWithoutMembrosInput = {
    id?: string
    nome: string
    descricao?: string | null
    cor?: string | null
    ativo?: boolean
    queueId?: number | null
    queueName?: string | null
    departamentos?: EquipePlantaoCreatedepartamentosInput | string[]
    isFallback?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipePlantaoCreateOrConnectWithoutMembrosInput = {
    where: EquipePlantaoWhereUniqueInput
    create: XOR<EquipePlantaoCreateWithoutMembrosInput, EquipePlantaoUncheckedCreateWithoutMembrosInput>
  }

  export type UserCreateWithoutMembrosEquipeInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasCreateNestedOneWithoutUserInput
    registros?: RegistrosCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembrosEquipeInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasUncheckedCreateNestedOneWithoutUserInput
    registros?: RegistrosUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembrosEquipeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembrosEquipeInput, UserUncheckedCreateWithoutMembrosEquipeInput>
  }

  export type EquipePlantaoUpsertWithoutMembrosInput = {
    update: XOR<EquipePlantaoUpdateWithoutMembrosInput, EquipePlantaoUncheckedUpdateWithoutMembrosInput>
    create: XOR<EquipePlantaoCreateWithoutMembrosInput, EquipePlantaoUncheckedCreateWithoutMembrosInput>
    where?: EquipePlantaoWhereInput
  }

  export type EquipePlantaoUpdateToOneWithWhereWithoutMembrosInput = {
    where?: EquipePlantaoWhereInput
    data: XOR<EquipePlantaoUpdateWithoutMembrosInput, EquipePlantaoUncheckedUpdateWithoutMembrosInput>
  }

  export type EquipePlantaoUpdateWithoutMembrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cor?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    queueId?: NullableIntFieldUpdateOperationsInput | number | null
    queueName?: NullableStringFieldUpdateOperationsInput | string | null
    departamentos?: EquipePlantaoUpdatedepartamentosInput | string[]
    isFallback?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipePlantaoUncheckedUpdateWithoutMembrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    cor?: NullableStringFieldUpdateOperationsInput | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    queueId?: NullableIntFieldUpdateOperationsInput | number | null
    queueName?: NullableStringFieldUpdateOperationsInput | string | null
    departamentos?: EquipePlantaoUpdatedepartamentosInput | string[]
    isFallback?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutMembrosEquipeInput = {
    update: XOR<UserUpdateWithoutMembrosEquipeInput, UserUncheckedUpdateWithoutMembrosEquipeInput>
    create: XOR<UserCreateWithoutMembrosEquipeInput, UserUncheckedCreateWithoutMembrosEquipeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembrosEquipeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembrosEquipeInput, UserUncheckedUpdateWithoutMembrosEquipeInput>
  }

  export type UserUpdateWithoutMembrosEquipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUpdateOneWithoutUserNestedInput
    registros?: RegistrosUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembrosEquipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUncheckedUpdateOneWithoutUserNestedInput
    registros?: RegistrosUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPlantaoInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    registros?: RegistrosCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlantaoInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    registros?: RegistrosUncheckedCreateNestedManyWithoutUserInput
    membrosEquipe?: MembroEquipeUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlantaoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlantaoInput, UserUncheckedCreateWithoutPlantaoInput>
  }

  export type RegistrosCreateWithoutPlantaoInput = {
    id?: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRegistrosInput
  }

  export type RegistrosUncheckedCreateWithoutPlantaoInput = {
    id?: string
    user_id: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrosCreateOrConnectWithoutPlantaoInput = {
    where: RegistrosWhereUniqueInput
    create: XOR<RegistrosCreateWithoutPlantaoInput, RegistrosUncheckedCreateWithoutPlantaoInput>
  }

  export type RegistrosCreateManyPlantaoInputEnvelope = {
    data: RegistrosCreateManyPlantaoInput | RegistrosCreateManyPlantaoInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPlantaoInput = {
    update: XOR<UserUpdateWithoutPlantaoInput, UserUncheckedUpdateWithoutPlantaoInput>
    create: XOR<UserCreateWithoutPlantaoInput, UserUncheckedCreateWithoutPlantaoInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlantaoInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlantaoInput, UserUncheckedUpdateWithoutPlantaoInput>
  }

  export type UserUpdateWithoutPlantaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    registros?: RegistrosUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlantaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    registros?: RegistrosUncheckedUpdateManyWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RegistrosUpsertWithWhereUniqueWithoutPlantaoInput = {
    where: RegistrosWhereUniqueInput
    update: XOR<RegistrosUpdateWithoutPlantaoInput, RegistrosUncheckedUpdateWithoutPlantaoInput>
    create: XOR<RegistrosCreateWithoutPlantaoInput, RegistrosUncheckedCreateWithoutPlantaoInput>
  }

  export type RegistrosUpdateWithWhereUniqueWithoutPlantaoInput = {
    where: RegistrosWhereUniqueInput
    data: XOR<RegistrosUpdateWithoutPlantaoInput, RegistrosUncheckedUpdateWithoutPlantaoInput>
  }

  export type RegistrosUpdateManyWithWhereWithoutPlantaoInput = {
    where: RegistrosScalarWhereInput
    data: XOR<RegistrosUpdateManyMutationInput, RegistrosUncheckedUpdateManyWithoutPlantaoInput>
  }

  export type RegistrosScalarWhereInput = {
    AND?: RegistrosScalarWhereInput | RegistrosScalarWhereInput[]
    OR?: RegistrosScalarWhereInput[]
    NOT?: RegistrosScalarWhereInput | RegistrosScalarWhereInput[]
    id?: StringFilter<"Registros"> | string
    plantao_id?: StringFilter<"Registros"> | string
    user_id?: StringFilter<"Registros"> | string
    data?: DateTimeFilter<"Registros"> | Date | string
    startTime?: DateTimeFilter<"Registros"> | Date | string
    endTime?: DateTimeFilter<"Registros"> | Date | string
    createdAt?: DateTimeFilter<"Registros"> | Date | string
    updatedAt?: DateTimeFilter<"Registros"> | Date | string
  }

  export type PlantonistasCreateWithoutRegistrosInput = {
    id?: string
    nome: string
    posicao?: number
    proxima_data?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlantaoInput
  }

  export type PlantonistasUncheckedCreateWithoutRegistrosInput = {
    id?: string
    nome: string
    posicao?: number
    proxima_data?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type PlantonistasCreateOrConnectWithoutRegistrosInput = {
    where: PlantonistasWhereUniqueInput
    create: XOR<PlantonistasCreateWithoutRegistrosInput, PlantonistasUncheckedCreateWithoutRegistrosInput>
  }

  export type UserCreateWithoutRegistrosInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasCreateNestedOneWithoutUserInput
    membrosEquipe?: MembroEquipeCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRegistrosInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    pass?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.NivelAcesso
    typeUser?: $Enums.TipoUsuario
    id_atendente?: string | null
    zproId?: number | null
    slackId?: string | null
    isPlantonista?: boolean
    posicao?: number | null
    plantao?: PlantonistasUncheckedCreateNestedOneWithoutUserInput
    membrosEquipe?: MembroEquipeUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRegistrosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRegistrosInput, UserUncheckedCreateWithoutRegistrosInput>
  }

  export type PlantonistasUpsertWithoutRegistrosInput = {
    update: XOR<PlantonistasUpdateWithoutRegistrosInput, PlantonistasUncheckedUpdateWithoutRegistrosInput>
    create: XOR<PlantonistasCreateWithoutRegistrosInput, PlantonistasUncheckedCreateWithoutRegistrosInput>
    where?: PlantonistasWhereInput
  }

  export type PlantonistasUpdateToOneWithWhereWithoutRegistrosInput = {
    where?: PlantonistasWhereInput
    data: XOR<PlantonistasUpdateWithoutRegistrosInput, PlantonistasUncheckedUpdateWithoutRegistrosInput>
  }

  export type PlantonistasUpdateWithoutRegistrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlantaoNestedInput
  }

  export type PlantonistasUncheckedUpdateWithoutRegistrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutRegistrosInput = {
    update: XOR<UserUpdateWithoutRegistrosInput, UserUncheckedUpdateWithoutRegistrosInput>
    create: XOR<UserCreateWithoutRegistrosInput, UserUncheckedCreateWithoutRegistrosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRegistrosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRegistrosInput, UserUncheckedUpdateWithoutRegistrosInput>
  }

  export type UserUpdateWithoutRegistrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUpdateOneWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRegistrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    pass?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumNivelAcessoFieldUpdateOperationsInput | $Enums.NivelAcesso
    typeUser?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    id_atendente?: NullableStringFieldUpdateOperationsInput | string | null
    zproId?: NullableIntFieldUpdateOperationsInput | number | null
    slackId?: NullableStringFieldUpdateOperationsInput | string | null
    isPlantonista?: BoolFieldUpdateOperationsInput | boolean
    posicao?: NullableIntFieldUpdateOperationsInput | number | null
    plantao?: PlantonistasUncheckedUpdateOneWithoutUserNestedInput
    membrosEquipe?: MembroEquipeUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlantonistasCreateWithoutUserInput = {
    id?: string
    nome: string
    posicao?: number
    proxima_data?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    registros?: RegistrosCreateNestedManyWithoutPlantaoInput
  }

  export type PlantonistasUncheckedCreateWithoutUserInput = {
    id?: string
    nome: string
    posicao?: number
    proxima_data?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    registros?: RegistrosUncheckedCreateNestedManyWithoutPlantaoInput
  }

  export type PlantonistasCreateOrConnectWithoutUserInput = {
    where: PlantonistasWhereUniqueInput
    create: XOR<PlantonistasCreateWithoutUserInput, PlantonistasUncheckedCreateWithoutUserInput>
  }

  export type RegistrosCreateWithoutUserInput = {
    id?: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    plantao: PlantonistasCreateNestedOneWithoutRegistrosInput
  }

  export type RegistrosUncheckedCreateWithoutUserInput = {
    id?: string
    plantao_id: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrosCreateOrConnectWithoutUserInput = {
    where: RegistrosWhereUniqueInput
    create: XOR<RegistrosCreateWithoutUserInput, RegistrosUncheckedCreateWithoutUserInput>
  }

  export type RegistrosCreateManyUserInputEnvelope = {
    data: RegistrosCreateManyUserInput | RegistrosCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MembroEquipeCreateWithoutUserInput = {
    id?: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    equipe: EquipePlantaoCreateNestedOneWithoutMembrosInput
  }

  export type MembroEquipeUncheckedCreateWithoutUserInput = {
    id?: string
    equipeId: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembroEquipeCreateOrConnectWithoutUserInput = {
    where: MembroEquipeWhereUniqueInput
    create: XOR<MembroEquipeCreateWithoutUserInput, MembroEquipeUncheckedCreateWithoutUserInput>
  }

  export type MembroEquipeCreateManyUserInputEnvelope = {
    data: MembroEquipeCreateManyUserInput | MembroEquipeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    issuer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    issuer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PlantonistasUpsertWithoutUserInput = {
    update: XOR<PlantonistasUpdateWithoutUserInput, PlantonistasUncheckedUpdateWithoutUserInput>
    create: XOR<PlantonistasCreateWithoutUserInput, PlantonistasUncheckedCreateWithoutUserInput>
    where?: PlantonistasWhereInput
  }

  export type PlantonistasUpdateToOneWithWhereWithoutUserInput = {
    where?: PlantonistasWhereInput
    data: XOR<PlantonistasUpdateWithoutUserInput, PlantonistasUncheckedUpdateWithoutUserInput>
  }

  export type PlantonistasUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registros?: RegistrosUpdateManyWithoutPlantaoNestedInput
  }

  export type PlantonistasUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    posicao?: IntFieldUpdateOperationsInput | number
    proxima_data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registros?: RegistrosUncheckedUpdateManyWithoutPlantaoNestedInput
  }

  export type RegistrosUpsertWithWhereUniqueWithoutUserInput = {
    where: RegistrosWhereUniqueInput
    update: XOR<RegistrosUpdateWithoutUserInput, RegistrosUncheckedUpdateWithoutUserInput>
    create: XOR<RegistrosCreateWithoutUserInput, RegistrosUncheckedCreateWithoutUserInput>
  }

  export type RegistrosUpdateWithWhereUniqueWithoutUserInput = {
    where: RegistrosWhereUniqueInput
    data: XOR<RegistrosUpdateWithoutUserInput, RegistrosUncheckedUpdateWithoutUserInput>
  }

  export type RegistrosUpdateManyWithWhereWithoutUserInput = {
    where: RegistrosScalarWhereInput
    data: XOR<RegistrosUpdateManyMutationInput, RegistrosUncheckedUpdateManyWithoutUserInput>
  }

  export type MembroEquipeUpsertWithWhereUniqueWithoutUserInput = {
    where: MembroEquipeWhereUniqueInput
    update: XOR<MembroEquipeUpdateWithoutUserInput, MembroEquipeUncheckedUpdateWithoutUserInput>
    create: XOR<MembroEquipeCreateWithoutUserInput, MembroEquipeUncheckedCreateWithoutUserInput>
  }

  export type MembroEquipeUpdateWithWhereUniqueWithoutUserInput = {
    where: MembroEquipeWhereUniqueInput
    data: XOR<MembroEquipeUpdateWithoutUserInput, MembroEquipeUncheckedUpdateWithoutUserInput>
  }

  export type MembroEquipeUpdateManyWithWhereWithoutUserInput = {
    where: MembroEquipeScalarWhereInput
    data: XOR<MembroEquipeUpdateManyMutationInput, MembroEquipeUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    issuer?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type MembroEquipeCreateManyEquipeInput = {
    id?: string
    userId: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembroEquipeUpdateWithoutEquipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembrosEquipeNestedInput
  }

  export type MembroEquipeUncheckedUpdateWithoutEquipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembroEquipeUncheckedUpdateManyWithoutEquipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrosCreateManyPlantaoInput = {
    id?: string
    user_id: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrosUpdateWithoutPlantaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRegistrosNestedInput
  }

  export type RegistrosUncheckedUpdateWithoutPlantaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrosUncheckedUpdateManyWithoutPlantaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrosCreateManyUserInput = {
    id?: string
    plantao_id: string
    data: Date | string
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembroEquipeCreateManyUserInput = {
    id?: string
    equipeId: string
    cargo?: string | null
    ordemSequencial?: number
    ultimoAtendimentoEm?: Date | string | null
    pesoPrioridade?: number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: number
    margemFimMinutos?: number
    ativo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    issuer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrosUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plantao?: PlantonistasUpdateOneRequiredWithoutRegistrosNestedInput
  }

  export type RegistrosUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantao_id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrosUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantao_id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembroEquipeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    equipe?: EquipePlantaoUpdateOneRequiredWithoutMembrosNestedInput
  }

  export type MembroEquipeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipeId?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembroEquipeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipeId?: StringFieldUpdateOperationsInput | string
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    ordemSequencial?: IntFieldUpdateOperationsInput | number
    ultimoAtendimentoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pesoPrioridade?: IntFieldUpdateOperationsInput | number
    turnos?: NullableJsonNullValueInput | InputJsonValue
    margemInicioMinutos?: IntFieldUpdateOperationsInput | number
    margemFimMinutos?: IntFieldUpdateOperationsInput | number
    ativo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}