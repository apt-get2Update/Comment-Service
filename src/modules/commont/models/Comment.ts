import {
    AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey,
    Table, UpdatedAt
} from "sequelize-typescript";
import Users from "../../users/models/Users";


@Table({
    tableName: "comments"
})
export default class Comment extends Model<Comment> {


    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    text: String;

    @ForeignKey(() => Users)
    @Column
    userId: number;

    @BelongsTo(() => Users)
    user: Users;
    
    @ForeignKey(() => Comment)
    @Column
    commentParentId: number;

    @HasMany(() => Comment)
    replies: Comment;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;
}
