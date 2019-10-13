"use strict";
import {QueryInterface} from "sequelize";
import {Sequelize} from "sequelize-typescript";

module.exports = {
    up: function (queryBuilder: QueryInterface) {
        return queryBuilder.createTable("user", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            mail:{
                type: Sequelize.STRING,
                allowNull: false   
            }
        });
    },

    down: function (queryBuilder: QueryInterface) {
        return queryBuilder.dropTable("user");
    }
};