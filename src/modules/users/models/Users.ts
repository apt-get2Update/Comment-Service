import {
    AutoIncrement,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";

@Table({
    tableName: "user"
})
export default class Users extends Model<Users> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: String;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    mail: String;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    token: String;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;
}
