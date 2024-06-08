import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { UserEntity } from "./entitites/user-entity";

// This is an array containing a provider object that configures and initializes a TypeORM DataSource.
export const DbConnection = [
  {
    provide: 'DataSource', //this name used to access the object
    // function that asynchronously creates and initializes the DataSource instance.
    useFactory: async (configService:ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [UserEntity],
        synchronize: true,
        logging:true
      })

      return await dataSource.initialize();
    },
    // allows useFactory to access the configuration service.
    inject:[ConfigService]
  }
]

