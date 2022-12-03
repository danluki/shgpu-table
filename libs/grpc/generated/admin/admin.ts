/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "admin";

export interface AddAdvertisingMessageRequest {
}

export interface AddAdvertisingMessageResponse {
}

export interface RemoveAdvertisingMessageRequest {
}

export interface RemoveAdvertisingMessageResponse {
}

export interface ChangeAdvertisingMessageRequest {
}

export interface ChangeAdvertisingMessageResponse {
}

export interface GetAdvertisingMessagesRequest {
}

export interface GetAdvertisingMessagesResponse {
}

export interface GetAdvertisingMessageRequest {
}

export interface GetAdvertisingMessageResponse {
}

export interface CreateRequest {
  name: string;
  pass: string;
}

export interface CreateResponse {
  name: string;
  pass: string;
  refreshToken: string;
  accessToken: string;
  id: number;
  error: string;
}

export interface ValidateRequest {
  name: string;
  pass: string;
}

export interface ValidateResponse {
  name: string;
  id: number;
  refreshToken: string;
  accessToken: string;
  error: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  refreshToken: string;
  accessToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
}

function createBaseAddAdvertisingMessageRequest(): AddAdvertisingMessageRequest {
  return {};
}

export const AddAdvertisingMessageRequest = {
  encode(_: AddAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): AddAdvertisingMessageRequest {
    return {};
  },

  toJSON(_: AddAdvertisingMessageRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<AddAdvertisingMessageRequest>): AddAdvertisingMessageRequest {
    const message = createBaseAddAdvertisingMessageRequest();
    return message;
  },
};

function createBaseAddAdvertisingMessageResponse(): AddAdvertisingMessageResponse {
  return {};
}

export const AddAdvertisingMessageResponse = {
  encode(_: AddAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): AddAdvertisingMessageResponse {
    return {};
  },

  toJSON(_: AddAdvertisingMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<AddAdvertisingMessageResponse>): AddAdvertisingMessageResponse {
    const message = createBaseAddAdvertisingMessageResponse();
    return message;
  },
};

function createBaseRemoveAdvertisingMessageRequest(): RemoveAdvertisingMessageRequest {
  return {};
}

export const RemoveAdvertisingMessageRequest = {
  encode(_: RemoveAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RemoveAdvertisingMessageRequest {
    return {};
  },

  toJSON(_: RemoveAdvertisingMessageRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<RemoveAdvertisingMessageRequest>): RemoveAdvertisingMessageRequest {
    const message = createBaseRemoveAdvertisingMessageRequest();
    return message;
  },
};

function createBaseRemoveAdvertisingMessageResponse(): RemoveAdvertisingMessageResponse {
  return {};
}

export const RemoveAdvertisingMessageResponse = {
  encode(_: RemoveAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RemoveAdvertisingMessageResponse {
    return {};
  },

  toJSON(_: RemoveAdvertisingMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<RemoveAdvertisingMessageResponse>): RemoveAdvertisingMessageResponse {
    const message = createBaseRemoveAdvertisingMessageResponse();
    return message;
  },
};

function createBaseChangeAdvertisingMessageRequest(): ChangeAdvertisingMessageRequest {
  return {};
}

export const ChangeAdvertisingMessageRequest = {
  encode(_: ChangeAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ChangeAdvertisingMessageRequest {
    return {};
  },

  toJSON(_: ChangeAdvertisingMessageRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<ChangeAdvertisingMessageRequest>): ChangeAdvertisingMessageRequest {
    const message = createBaseChangeAdvertisingMessageRequest();
    return message;
  },
};

function createBaseChangeAdvertisingMessageResponse(): ChangeAdvertisingMessageResponse {
  return {};
}

export const ChangeAdvertisingMessageResponse = {
  encode(_: ChangeAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ChangeAdvertisingMessageResponse {
    return {};
  },

  toJSON(_: ChangeAdvertisingMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<ChangeAdvertisingMessageResponse>): ChangeAdvertisingMessageResponse {
    const message = createBaseChangeAdvertisingMessageResponse();
    return message;
  },
};

function createBaseGetAdvertisingMessagesRequest(): GetAdvertisingMessagesRequest {
  return {};
}

export const GetAdvertisingMessagesRequest = {
  encode(_: GetAdvertisingMessagesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetAdvertisingMessagesRequest {
    return {};
  },

  toJSON(_: GetAdvertisingMessagesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetAdvertisingMessagesRequest>): GetAdvertisingMessagesRequest {
    const message = createBaseGetAdvertisingMessagesRequest();
    return message;
  },
};

function createBaseGetAdvertisingMessagesResponse(): GetAdvertisingMessagesResponse {
  return {};
}

export const GetAdvertisingMessagesResponse = {
  encode(_: GetAdvertisingMessagesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessagesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetAdvertisingMessagesResponse {
    return {};
  },

  toJSON(_: GetAdvertisingMessagesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetAdvertisingMessagesResponse>): GetAdvertisingMessagesResponse {
    const message = createBaseGetAdvertisingMessagesResponse();
    return message;
  },
};

function createBaseGetAdvertisingMessageRequest(): GetAdvertisingMessageRequest {
  return {};
}

export const GetAdvertisingMessageRequest = {
  encode(_: GetAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetAdvertisingMessageRequest {
    return {};
  },

  toJSON(_: GetAdvertisingMessageRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetAdvertisingMessageRequest>): GetAdvertisingMessageRequest {
    const message = createBaseGetAdvertisingMessageRequest();
    return message;
  },
};

function createBaseGetAdvertisingMessageResponse(): GetAdvertisingMessageResponse {
  return {};
}

export const GetAdvertisingMessageResponse = {
  encode(_: GetAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetAdvertisingMessageResponse {
    return {};
  },

  toJSON(_: GetAdvertisingMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetAdvertisingMessageResponse>): GetAdvertisingMessageResponse {
    const message = createBaseGetAdvertisingMessageResponse();
    return message;
  },
};

function createBaseCreateRequest(): CreateRequest {
  return { name: "", pass: "" };
}

export const CreateRequest = {
  encode(message: CreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.pass !== "") {
      writer.uint32(18).string(message.pass);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.pass = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateRequest {
    return { name: isSet(object.name) ? String(object.name) : "", pass: isSet(object.pass) ? String(object.pass) : "" };
  },

  toJSON(message: CreateRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.pass !== undefined && (obj.pass = message.pass);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateRequest>): CreateRequest {
    const message = createBaseCreateRequest();
    message.name = object.name ?? "";
    message.pass = object.pass ?? "";
    return message;
  },
};

function createBaseCreateResponse(): CreateResponse {
  return { name: "", pass: "", refreshToken: "", accessToken: "", id: 0, error: "" };
}

export const CreateResponse = {
  encode(message: CreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.pass !== "") {
      writer.uint32(18).string(message.pass);
    }
    if (message.refreshToken !== "") {
      writer.uint32(26).string(message.refreshToken);
    }
    if (message.accessToken !== "") {
      writer.uint32(34).string(message.accessToken);
    }
    if (message.id !== 0) {
      writer.uint32(40).uint32(message.id);
    }
    if (message.error !== "") {
      writer.uint32(50).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.pass = reader.string();
          break;
        case 3:
          message.refreshToken = reader.string();
          break;
        case 4:
          message.accessToken = reader.string();
          break;
        case 5:
          message.id = reader.uint32();
          break;
        case 6:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateResponse {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      pass: isSet(object.pass) ? String(object.pass) : "",
      refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "",
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: CreateResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.pass !== undefined && (obj.pass = message.pass);
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateResponse>): CreateResponse {
    const message = createBaseCreateResponse();
    message.name = object.name ?? "";
    message.pass = object.pass ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.accessToken = object.accessToken ?? "";
    message.id = object.id ?? 0;
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseValidateRequest(): ValidateRequest {
  return { name: "", pass: "" };
}

export const ValidateRequest = {
  encode(message: ValidateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.pass !== "") {
      writer.uint32(18).string(message.pass);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.pass = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidateRequest {
    return { name: isSet(object.name) ? String(object.name) : "", pass: isSet(object.pass) ? String(object.pass) : "" };
  },

  toJSON(message: ValidateRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.pass !== undefined && (obj.pass = message.pass);
    return obj;
  },

  fromPartial(object: DeepPartial<ValidateRequest>): ValidateRequest {
    const message = createBaseValidateRequest();
    message.name = object.name ?? "";
    message.pass = object.pass ?? "";
    return message;
  },
};

function createBaseValidateResponse(): ValidateResponse {
  return { name: "", id: 0, refreshToken: "", accessToken: "", error: "" };
}

export const ValidateResponse = {
  encode(message: ValidateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint32(message.id);
    }
    if (message.refreshToken !== "") {
      writer.uint32(26).string(message.refreshToken);
    }
    if (message.accessToken !== "") {
      writer.uint32(34).string(message.accessToken);
    }
    if (message.error !== "") {
      writer.uint32(50).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.id = reader.uint32();
          break;
        case 3:
          message.refreshToken = reader.string();
          break;
        case 4:
          message.accessToken = reader.string();
          break;
        case 6:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidateResponse {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "",
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: ValidateResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial(object: DeepPartial<ValidateResponse>): ValidateResponse {
    const message = createBaseValidateResponse();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    message.refreshToken = object.refreshToken ?? "";
    message.accessToken = object.accessToken ?? "";
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseRefreshRequest(): RefreshRequest {
  return { refreshToken: "" };
}

export const RefreshRequest = {
  encode(message: RefreshRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.refreshToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RefreshRequest {
    return { refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "" };
  },

  toJSON(message: RefreshRequest): unknown {
    const obj: any = {};
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    return obj;
  },

  fromPartial(object: DeepPartial<RefreshRequest>): RefreshRequest {
    const message = createBaseRefreshRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseRefreshResponse(): RefreshResponse {
  return { refreshToken: "", accessToken: "" };
}

export const RefreshResponse = {
  encode(message: RefreshResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    if (message.accessToken !== "") {
      writer.uint32(18).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.refreshToken = reader.string();
          break;
        case 2:
          message.accessToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RefreshResponse {
    return {
      refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "",
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
    };
  },

  toJSON(message: RefreshResponse): unknown {
    const obj: any = {};
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    return obj;
  },

  fromPartial(object: DeepPartial<RefreshResponse>): RefreshResponse {
    const message = createBaseRefreshResponse();
    message.refreshToken = object.refreshToken ?? "";
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseLogoutRequest(): LogoutRequest {
  return { refreshToken: "" };
}

export const LogoutRequest = {
  encode(message: LogoutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogoutRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogoutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.refreshToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LogoutRequest {
    return { refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "" };
  },

  toJSON(message: LogoutRequest): unknown {
    const obj: any = {};
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    return obj;
  },

  fromPartial(object: DeepPartial<LogoutRequest>): LogoutRequest {
    const message = createBaseLogoutRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseLogoutResponse(): LogoutResponse {
  return {};
}

export const LogoutResponse = {
  encode(_: LogoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogoutResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): LogoutResponse {
    return {};
  },

  toJSON(_: LogoutResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<LogoutResponse>): LogoutResponse {
    const message = createBaseLogoutResponse();
    return message;
  },
};

export type AdminDefinition = typeof AdminDefinition;
export const AdminDefinition = {
  name: "Admin",
  fullName: "admin.Admin",
  methods: {
    create: {
      name: "Create",
      requestType: CreateRequest,
      requestStream: false,
      responseType: CreateResponse,
      responseStream: false,
      options: {},
    },
    validate: {
      name: "Validate",
      requestType: ValidateRequest,
      requestStream: false,
      responseType: ValidateResponse,
      responseStream: false,
      options: {},
    },
    refresh: {
      name: "Refresh",
      requestType: RefreshRequest,
      requestStream: false,
      responseType: RefreshResponse,
      responseStream: false,
      options: {},
    },
    logout: {
      name: "Logout",
      requestType: LogoutRequest,
      requestStream: false,
      responseType: LogoutResponse,
      responseStream: false,
      options: {},
    },
    addAdvertisingMessage: {
      name: "AddAdvertisingMessage",
      requestType: AddAdvertisingMessageRequest,
      requestStream: false,
      responseType: AddAdvertisingMessageResponse,
      responseStream: false,
      options: {},
    },
    removeAdvertisingMessage: {
      name: "RemoveAdvertisingMessage",
      requestType: RemoveAdvertisingMessageRequest,
      requestStream: false,
      responseType: RemoveAdvertisingMessageResponse,
      responseStream: false,
      options: {},
    },
    changeAdvertisingMessage: {
      name: "ChangeAdvertisingMessage",
      requestType: ChangeAdvertisingMessageRequest,
      requestStream: false,
      responseType: ChangeAdvertisingMessageResponse,
      responseStream: false,
      options: {},
    },
    getAdvertisingMessages: {
      name: "GetAdvertisingMessages",
      requestType: GetAdvertisingMessagesRequest,
      requestStream: false,
      responseType: GetAdvertisingMessagesResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AdminServiceImplementation<CallContextExt = {}> {
  create(request: CreateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CreateResponse>>;
  validate(request: ValidateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ValidateResponse>>;
  refresh(request: RefreshRequest, context: CallContext & CallContextExt): Promise<DeepPartial<RefreshResponse>>;
  logout(request: LogoutRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LogoutResponse>>;
  addAdvertisingMessage(
    request: AddAdvertisingMessageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AddAdvertisingMessageResponse>>;
  removeAdvertisingMessage(
    request: RemoveAdvertisingMessageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<RemoveAdvertisingMessageResponse>>;
  changeAdvertisingMessage(
    request: ChangeAdvertisingMessageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ChangeAdvertisingMessageResponse>>;
  getAdvertisingMessages(
    request: GetAdvertisingMessagesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetAdvertisingMessagesResponse>>;
}

export interface AdminClient<CallOptionsExt = {}> {
  create(request: DeepPartial<CreateRequest>, options?: CallOptions & CallOptionsExt): Promise<CreateResponse>;
  validate(request: DeepPartial<ValidateRequest>, options?: CallOptions & CallOptionsExt): Promise<ValidateResponse>;
  refresh(request: DeepPartial<RefreshRequest>, options?: CallOptions & CallOptionsExt): Promise<RefreshResponse>;
  logout(request: DeepPartial<LogoutRequest>, options?: CallOptions & CallOptionsExt): Promise<LogoutResponse>;
  addAdvertisingMessage(
    request: DeepPartial<AddAdvertisingMessageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AddAdvertisingMessageResponse>;
  removeAdvertisingMessage(
    request: DeepPartial<RemoveAdvertisingMessageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<RemoveAdvertisingMessageResponse>;
  changeAdvertisingMessage(
    request: DeepPartial<ChangeAdvertisingMessageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ChangeAdvertisingMessageResponse>;
  getAdvertisingMessages(
    request: DeepPartial<GetAdvertisingMessagesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetAdvertisingMessagesResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
