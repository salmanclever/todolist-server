"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.PORT || 4000;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello To TODO API Document',
            version: '1.0.0',
        }
    },
    apis: ['./src/routes/*.ts'],
};
const openapiSpecification = swagger_jsdoc_1.default(options);
const app = express_1.default();
dotenv_1.default.config();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(routes_1.default);
var swaggerUiOptions = {
    explorer: true
};
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecification, swaggerUiOptions));
const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGODB_DB}?retryWrites=true&w=majority&authSource=admin`;
// const options = { useNewUrlParser: true, useUnifiedTopology: true }
// mongoose.set("useFindAndModify", false)
mongoose_1.default.connect(uri).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.log(`Server error :`, error);
});
