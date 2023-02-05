/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "admin";

export interface Timestamp {
  seconds: number;
  nanos: number;
}

export interface GetAdminRequest {
  refreshToken: string;
}

export interface GetAdminResponse {
  name: string;
  id: number;
}

export interface Advertising {
  id: number;
  faculties: number[];
  adminId: number;
  text: string;
  totalCount: number;
  sendDate: Timestamp | undefined;
}

export interface AddAdvertisingMessageRequest {
  faculties: number[];
  adminId: number;
  text: string;
  totalCount: number;
  sendDate: Timestamp | undefined;
}

export interface AddAdvertisingMessageResponse {
  id: number;
  faculties: number[];
  adminId: number;
  text: string;
  totalCount?: number | undefined;
  sendDate: Timestamp | undefined;
}

export interface RemoveAdvertisingMessageRequest {
  advertisingId: number;
}

export interface RemoveAdvertisingMessageResponse {
  removedCount: number;
}

export interface ChangeAdvertisingMessageRequest {
  advertisingId: number;
  faculties: number[];
  adminId: number;
  text: string;
  totalCount: number;
  sendDate: Timestamp | undefined;
}

export interface ChangeAdvertisingMessageResponse {
  advertising: Advertising | undefined;
}

export interface GetAdvertisingMessagesRequest {
  adminId: number;
}

export interface GetAdvertisingMessagesResponse {
  advertisings: Advertising[];
}

export interface GetAdvertisingMessageRequest {
  id: number;
  adminId: number;
}

export interface GetAdvertisingMessageResponse {
  advertising: Advertising | undefined;
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

export interface LoginRequest {
  name: string;
  pass: string;
}

export interface LoginResponse {
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

export interface ValidateRequest {
  accessToken: string;
}

export interface ValidateResponse {
  id: number;
  expiresAt: number;
  issuedAt: number;
}

function createBaseTimestamp(): Timestamp {
  return { seconds: 0, nanos: 0 };
}

export const Timestamp = {
  encode(message: Timestamp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seconds !== 0) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Timestamp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Timestamp {
    return {
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0,
    };
  },

  toJSON(message: Timestamp): unknown {
    const obj: any = {};
    message.seconds !== undefined && (obj.seconds = Math.round(message.seconds));
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    return obj;
  },

  create(base?: DeepPartial<Timestamp>): Timestamp {
    return Timestamp.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Timestamp>): Timestamp {
    const message = createBaseTimestamp();
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

function createBaseGetAdminRequest(): GetAdminRequest {
  return { refreshToken: "" };
}

export const GetAdminRequest = {
  encode(message: GetAdminRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdminRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdminRequest();
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

  fromJSON(object: any): GetAdminRequest {
    return { refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "" };
  },

  toJSON(message: GetAdminRequest): unknown {
    const obj: any = {};
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    return obj;
  },

  create(base?: DeepPartial<GetAdminRequest>): GetAdminRequest {
    return GetAdminRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetAdminRequest>): GetAdminRequest {
    const message = createBaseGetAdminRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseGetAdminResponse(): GetAdminResponse {
  return { name: "", id: 0 };
}

export const GetAdminResponse = {
  encode(message: GetAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(40).uint32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 5:
          message.id = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAdminResponse {
    return { name: isSet(object.name) ? String(object.name) : "", id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: GetAdminResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  create(base?: DeepPartial<GetAdminResponse>): GetAdminResponse {
    return GetAdminResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetAdminResponse>): GetAdminResponse {
    const message = createBaseGetAdminResponse();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseAdvertising(): Advertising {
  return { id: 0, faculties: [], adminId: 0, text: "", totalCount: 0, sendDate: undefined };
}

export const Advertising = {
  encode(message: Advertising, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    writer.uint32(18).fork();
    for (const v of message.faculties) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.adminId !== 0) {
      writer.uint32(24).uint32(message.adminId);
    }
    if (message.text !== "") {
      writer.uint32(34).string(message.text);
    }
    if (message.totalCount !== 0) {
      writer.uint32(40).uint32(message.totalCount);
    }
    if (message.sendDate !== undefined) {
      Timestamp.encode(message.sendDate, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Advertising {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdvertising();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.faculties.push(reader.int32());
            }
          } else {
            message.faculties.push(reader.int32());
          }
          break;
        case 3:
          message.adminId = reader.uint32();
          break;
        case 4:
          message.text = reader.string();
          break;
        case 5:
          message.totalCount = reader.uint32();
          break;
        case 6:
          message.sendDate = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Advertising {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      faculties: Array.isArray(object?.faculties) ? object.faculties.map((e: any) => Number(e)) : [],
      adminId: isSet(object.adminId) ? Number(object.adminId) : 0,
      text: isSet(object.text) ? String(object.text) : "",
      totalCount: isSet(object.totalCount) ? Number(object.totalCount) : 0,
      sendDate: isSet(object.sendDate) ? Timestamp.fromJSON(object.sendDate) : undefined,
    };
  },

  toJSON(message: Advertising): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.faculties) {
      obj.faculties = message.faculties.map((e) => Math.round(e));
    } else {
      obj.faculties = [];
    }
    message.adminId !== undefined && (obj.adminId = Math.round(message.adminId));
    message.text !== undefined && (obj.text = message.text);
    message.totalCount !== undefined && (obj.totalCount = Math.round(message.totalCount));
    message.sendDate !== undefined &&
      (obj.sendDate = message.sendDate ? Timestamp.toJSON(message.sendDate) : undefined);
    return obj;
  },

  create(base?: DeepPartial<Advertising>): Advertising {
    return Advertising.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Advertising>): Advertising {
    const message = createBaseAdvertising();
    message.id = object.id ?? 0;
    message.faculties = object.faculties?.map((e) => e) || [];
    message.adminId = object.adminId ?? 0;
    message.text = object.text ?? "";
    message.totalCount = object.totalCount ?? 0;
    message.sendDate = (object.sendDate !== undefined && object.sendDate !== null)
      ? Timestamp.fromPartial(object.sendDate)
      : undefined;
    return message;
  },
};

function createBaseAddAdvertisingMessageRequest(): AddAdvertisingMessageRequest {
  return { faculties: [], adminId: 0, text: "", totalCount: 0, sendDate: undefined };
}

export const AddAdvertisingMessageRequest = {
  encode(message: AddAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.faculties) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.adminId !== 0) {
      writer.uint32(16).uint32(message.adminId);
    }
    if (message.text !== "") {
      writer.uint32(26).string(message.text);
    }
    if (message.totalCount !== 0) {
      writer.uint32(32).uint32(message.totalCount);
    }
    if (message.sendDate !== undefined) {
      Timestamp.encode(message.sendDate, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.faculties.push(reader.int32());
            }
          } else {
            message.faculties.push(reader.int32());
          }
          break;
        case 2:
          message.adminId = reader.uint32();
          break;
        case 3:
          message.text = reader.string();
          break;
        case 4:
          message.totalCount = reader.uint32();
          break;
        case 5:
          message.sendDate = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddAdvertisingMessageRequest {
    return {
      faculties: Array.isArray(object?.faculties) ? object.faculties.map((e: any) => Number(e)) : [],
      adminId: isSet(object.adminId) ? Number(object.adminId) : 0,
      text: isSet(object.text) ? String(object.text) : "",
      totalCount: isSet(object.totalCount) ? Number(object.totalCount) : 0,
      sendDate: isSet(object.sendDate) ? Timestamp.fromJSON(object.sendDate) : undefined,
    };
  },

  toJSON(message: AddAdvertisingMessageRequest): unknown {
    const obj: any = {};
    if (message.faculties) {
      obj.faculties = message.faculties.map((e) => Math.round(e));
    } else {
      obj.faculties = [];
    }
    message.adminId !== undefined && (obj.adminId = Math.round(message.adminId));
    message.text !== undefined && (obj.text = message.text);
    message.totalCount !== undefined && (obj.totalCount = Math.round(message.totalCount));
    message.sendDate !== undefined &&
      (obj.sendDate = message.sendDate ? Timestamp.toJSON(message.sendDate) : undefined);
    return obj;
  },

  create(base?: DeepPartial<AddAdvertisingMessageRequest>): AddAdvertisingMessageRequest {
    return AddAdvertisingMessageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AddAdvertisingMessageRequest>): AddAdvertisingMessageRequest {
    const message = createBaseAddAdvertisingMessageRequest();
    message.faculties = object.faculties?.map((e) => e) || [];
    message.adminId = object.adminId ?? 0;
    message.text = object.text ?? "";
    message.totalCount = object.totalCount ?? 0;
    message.sendDate = (object.sendDate !== undefined && object.sendDate !== null)
      ? Timestamp.fromPartial(object.sendDate)
      : undefined;
    return message;
  },
};

function createBaseAddAdvertisingMessageResponse(): AddAdvertisingMessageResponse {
  return { id: 0, faculties: [], adminId: 0, text: "", totalCount: undefined, sendDate: undefined };
}

export const AddAdvertisingMessageResponse = {
  encode(message: AddAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    writer.uint32(18).fork();
    for (const v of message.faculties) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.adminId !== 0) {
      writer.uint32(24).uint32(message.adminId);
    }
    if (message.text !== "") {
      writer.uint32(34).string(message.text);
    }
    if (message.totalCount !== undefined) {
      writer.uint32(40).uint32(message.totalCount);
    }
    if (message.sendDate !== undefined) {
      Timestamp.encode(message.sendDate, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.faculties.push(reader.int32());
            }
          } else {
            message.faculties.push(reader.int32());
          }
          break;
        case 3:
          message.adminId = reader.uint32();
          break;
        case 4:
          message.text = reader.string();
          break;
        case 5:
          message.totalCount = reader.uint32();
          break;
        case 6:
          message.sendDate = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddAdvertisingMessageResponse {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      faculties: Array.isArray(object?.faculties) ? object.faculties.map((e: any) => Number(e)) : [],
      adminId: isSet(object.adminId) ? Number(object.adminId) : 0,
      text: isSet(object.text) ? String(object.text) : "",
      totalCount: isSet(object.totalCount) ? Number(object.totalCount) : undefined,
      sendDate: isSet(object.sendDate) ? Timestamp.fromJSON(object.sendDate) : undefined,
    };
  },

  toJSON(message: AddAdvertisingMessageResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.faculties) {
      obj.faculties = message.faculties.map((e) => Math.round(e));
    } else {
      obj.faculties = [];
    }
    message.adminId !== undefined && (obj.adminId = Math.round(message.adminId));
    message.text !== undefined && (obj.text = message.text);
    message.totalCount !== undefined && (obj.totalCount = Math.round(message.totalCount));
    message.sendDate !== undefined &&
      (obj.sendDate = message.sendDate ? Timestamp.toJSON(message.sendDate) : undefined);
    return obj;
  },

  create(base?: DeepPartial<AddAdvertisingMessageResponse>): AddAdvertisingMessageResponse {
    return AddAdvertisingMessageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AddAdvertisingMessageResponse>): AddAdvertisingMessageResponse {
    const message = createBaseAddAdvertisingMessageResponse();
    message.id = object.id ?? 0;
    message.faculties = object.faculties?.map((e) => e) || [];
    message.adminId = object.adminId ?? 0;
    message.text = object.text ?? "";
    message.totalCount = object.totalCount ?? undefined;
    message.sendDate = (object.sendDate !== undefined && object.sendDate !== null)
      ? Timestamp.fromPartial(object.sendDate)
      : undefined;
    return message;
  },
};

function createBaseRemoveAdvertisingMessageRequest(): RemoveAdvertisingMessageRequest {
  return { advertisingId: 0 };
}

export const RemoveAdvertisingMessageRequest = {
  encode(message: RemoveAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.advertisingId !== 0) {
      writer.uint32(8).uint32(message.advertisingId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.advertisingId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveAdvertisingMessageRequest {
    return { advertisingId: isSet(object.advertisingId) ? Number(object.advertisingId) : 0 };
  },

  toJSON(message: RemoveAdvertisingMessageRequest): unknown {
    const obj: any = {};
    message.advertisingId !== undefined && (obj.advertisingId = Math.round(message.advertisingId));
    return obj;
  },

  create(base?: DeepPartial<RemoveAdvertisingMessageRequest>): RemoveAdvertisingMessageRequest {
    return RemoveAdvertisingMessageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RemoveAdvertisingMessageRequest>): RemoveAdvertisingMessageRequest {
    const message = createBaseRemoveAdvertisingMessageRequest();
    message.advertisingId = object.advertisingId ?? 0;
    return message;
  },
};

function createBaseRemoveAdvertisingMessageResponse(): RemoveAdvertisingMessageResponse {
  return { removedCount: 0 };
}

export const RemoveAdvertisingMessageResponse = {
  encode(message: RemoveAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.removedCount !== 0) {
      writer.uint32(8).uint32(message.removedCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.removedCount = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveAdvertisingMessageResponse {
    return { removedCount: isSet(object.removedCount) ? Number(object.removedCount) : 0 };
  },

  toJSON(message: RemoveAdvertisingMessageResponse): unknown {
    const obj: any = {};
    message.removedCount !== undefined && (obj.removedCount = Math.round(message.removedCount));
    return obj;
  },

  create(base?: DeepPartial<RemoveAdvertisingMessageResponse>): RemoveAdvertisingMessageResponse {
    return RemoveAdvertisingMessageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RemoveAdvertisingMessageResponse>): RemoveAdvertisingMessageResponse {
    const message = createBaseRemoveAdvertisingMessageResponse();
    message.removedCount = object.removedCount ?? 0;
    return message;
  },
};

function createBaseChangeAdvertisingMessageRequest(): ChangeAdvertisingMessageRequest {
  return { advertisingId: 0, faculties: [], adminId: 0, text: "", totalCount: 0, sendDate: undefined };
}

export const ChangeAdvertisingMessageRequest = {
  encode(message: ChangeAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.advertisingId !== 0) {
      writer.uint32(8).uint32(message.advertisingId);
    }
    writer.uint32(18).fork();
    for (const v of message.faculties) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.adminId !== 0) {
      writer.uint32(24).uint32(message.adminId);
    }
    if (message.text !== "") {
      writer.uint32(34).string(message.text);
    }
    if (message.totalCount !== 0) {
      writer.uint32(40).uint32(message.totalCount);
    }
    if (message.sendDate !== undefined) {
      Timestamp.encode(message.sendDate, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.advertisingId = reader.uint32();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.faculties.push(reader.int32());
            }
          } else {
            message.faculties.push(reader.int32());
          }
          break;
        case 3:
          message.adminId = reader.uint32();
          break;
        case 4:
          message.text = reader.string();
          break;
        case 5:
          message.totalCount = reader.uint32();
          break;
        case 6:
          message.sendDate = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChangeAdvertisingMessageRequest {
    return {
      advertisingId: isSet(object.advertisingId) ? Number(object.advertisingId) : 0,
      faculties: Array.isArray(object?.faculties) ? object.faculties.map((e: any) => Number(e)) : [],
      adminId: isSet(object.adminId) ? Number(object.adminId) : 0,
      text: isSet(object.text) ? String(object.text) : "",
      totalCount: isSet(object.totalCount) ? Number(object.totalCount) : 0,
      sendDate: isSet(object.sendDate) ? Timestamp.fromJSON(object.sendDate) : undefined,
    };
  },

  toJSON(message: ChangeAdvertisingMessageRequest): unknown {
    const obj: any = {};
    message.advertisingId !== undefined && (obj.advertisingId = Math.round(message.advertisingId));
    if (message.faculties) {
      obj.faculties = message.faculties.map((e) => Math.round(e));
    } else {
      obj.faculties = [];
    }
    message.adminId !== undefined && (obj.adminId = Math.round(message.adminId));
    message.text !== undefined && (obj.text = message.text);
    message.totalCount !== undefined && (obj.totalCount = Math.round(message.totalCount));
    message.sendDate !== undefined &&
      (obj.sendDate = message.sendDate ? Timestamp.toJSON(message.sendDate) : undefined);
    return obj;
  },

  create(base?: DeepPartial<ChangeAdvertisingMessageRequest>): ChangeAdvertisingMessageRequest {
    return ChangeAdvertisingMessageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ChangeAdvertisingMessageRequest>): ChangeAdvertisingMessageRequest {
    const message = createBaseChangeAdvertisingMessageRequest();
    message.advertisingId = object.advertisingId ?? 0;
    message.faculties = object.faculties?.map((e) => e) || [];
    message.adminId = object.adminId ?? 0;
    message.text = object.text ?? "";
    message.totalCount = object.totalCount ?? 0;
    message.sendDate = (object.sendDate !== undefined && object.sendDate !== null)
      ? Timestamp.fromPartial(object.sendDate)
      : undefined;
    return message;
  },
};

function createBaseChangeAdvertisingMessageResponse(): ChangeAdvertisingMessageResponse {
  return { advertising: undefined };
}

export const ChangeAdvertisingMessageResponse = {
  encode(message: ChangeAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.advertising !== undefined) {
      Advertising.encode(message.advertising, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.advertising = Advertising.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChangeAdvertisingMessageResponse {
    return { advertising: isSet(object.advertising) ? Advertising.fromJSON(object.advertising) : undefined };
  },

  toJSON(message: ChangeAdvertisingMessageResponse): unknown {
    const obj: any = {};
    message.advertising !== undefined &&
      (obj.advertising = message.advertising ? Advertising.toJSON(message.advertising) : undefined);
    return obj;
  },

  create(base?: DeepPartial<ChangeAdvertisingMessageResponse>): ChangeAdvertisingMessageResponse {
    return ChangeAdvertisingMessageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ChangeAdvertisingMessageResponse>): ChangeAdvertisingMessageResponse {
    const message = createBaseChangeAdvertisingMessageResponse();
    message.advertising = (object.advertising !== undefined && object.advertising !== null)
      ? Advertising.fromPartial(object.advertising)
      : undefined;
    return message;
  },
};

function createBaseGetAdvertisingMessagesRequest(): GetAdvertisingMessagesRequest {
  return { adminId: 0 };
}

export const GetAdvertisingMessagesRequest = {
  encode(message: GetAdvertisingMessagesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.adminId !== 0) {
      writer.uint32(8).uint32(message.adminId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.adminId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAdvertisingMessagesRequest {
    return { adminId: isSet(object.adminId) ? Number(object.adminId) : 0 };
  },

  toJSON(message: GetAdvertisingMessagesRequest): unknown {
    const obj: any = {};
    message.adminId !== undefined && (obj.adminId = Math.round(message.adminId));
    return obj;
  },

  create(base?: DeepPartial<GetAdvertisingMessagesRequest>): GetAdvertisingMessagesRequest {
    return GetAdvertisingMessagesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetAdvertisingMessagesRequest>): GetAdvertisingMessagesRequest {
    const message = createBaseGetAdvertisingMessagesRequest();
    message.adminId = object.adminId ?? 0;
    return message;
  },
};

function createBaseGetAdvertisingMessagesResponse(): GetAdvertisingMessagesResponse {
  return { advertisings: [] };
}

export const GetAdvertisingMessagesResponse = {
  encode(message: GetAdvertisingMessagesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.advertisings) {
      Advertising.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessagesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.advertisings.push(Advertising.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAdvertisingMessagesResponse {
    return {
      advertisings: Array.isArray(object?.advertisings)
        ? object.advertisings.map((e: any) => Advertising.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetAdvertisingMessagesResponse): unknown {
    const obj: any = {};
    if (message.advertisings) {
      obj.advertisings = message.advertisings.map((e) => e ? Advertising.toJSON(e) : undefined);
    } else {
      obj.advertisings = [];
    }
    return obj;
  },

  create(base?: DeepPartial<GetAdvertisingMessagesResponse>): GetAdvertisingMessagesResponse {
    return GetAdvertisingMessagesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetAdvertisingMessagesResponse>): GetAdvertisingMessagesResponse {
    const message = createBaseGetAdvertisingMessagesResponse();
    message.advertisings = object.advertisings?.map((e) => Advertising.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetAdvertisingMessageRequest(): GetAdvertisingMessageRequest {
  return { id: 0, adminId: 0 };
}

export const GetAdvertisingMessageRequest = {
  encode(message: GetAdvertisingMessageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.adminId !== 0) {
      writer.uint32(16).uint32(message.adminId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.adminId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAdvertisingMessageRequest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      adminId: isSet(object.adminId) ? Number(object.adminId) : 0,
    };
  },

  toJSON(message: GetAdvertisingMessageRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.adminId !== undefined && (obj.adminId = Math.round(message.adminId));
    return obj;
  },

  create(base?: DeepPartial<GetAdvertisingMessageRequest>): GetAdvertisingMessageRequest {
    return GetAdvertisingMessageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetAdvertisingMessageRequest>): GetAdvertisingMessageRequest {
    const message = createBaseGetAdvertisingMessageRequest();
    message.id = object.id ?? 0;
    message.adminId = object.adminId ?? 0;
    return message;
  },
};

function createBaseGetAdvertisingMessageResponse(): GetAdvertisingMessageResponse {
  return { advertising: undefined };
}

export const GetAdvertisingMessageResponse = {
  encode(message: GetAdvertisingMessageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.advertising !== undefined) {
      Advertising.encode(message.advertising, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAdvertisingMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAdvertisingMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.advertising = Advertising.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAdvertisingMessageResponse {
    return { advertising: isSet(object.advertising) ? Advertising.fromJSON(object.advertising) : undefined };
  },

  toJSON(message: GetAdvertisingMessageResponse): unknown {
    const obj: any = {};
    message.advertising !== undefined &&
      (obj.advertising = message.advertising ? Advertising.toJSON(message.advertising) : undefined);
    return obj;
  },

  create(base?: DeepPartial<GetAdvertisingMessageResponse>): GetAdvertisingMessageResponse {
    return GetAdvertisingMessageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetAdvertisingMessageResponse>): GetAdvertisingMessageResponse {
    const message = createBaseGetAdvertisingMessageResponse();
    message.advertising = (object.advertising !== undefined && object.advertising !== null)
      ? Advertising.fromPartial(object.advertising)
      : undefined;
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

  create(base?: DeepPartial<CreateRequest>): CreateRequest {
    return CreateRequest.fromPartial(base ?? {});
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

  create(base?: DeepPartial<CreateResponse>): CreateResponse {
    return CreateResponse.fromPartial(base ?? {});
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

function createBaseLoginRequest(): LoginRequest {
  return { name: "", pass: "" };
}

export const LoginRequest = {
  encode(message: LoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.pass !== "") {
      writer.uint32(18).string(message.pass);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
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

  fromJSON(object: any): LoginRequest {
    return { name: isSet(object.name) ? String(object.name) : "", pass: isSet(object.pass) ? String(object.pass) : "" };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.pass !== undefined && (obj.pass = message.pass);
    return obj;
  },

  create(base?: DeepPartial<LoginRequest>): LoginRequest {
    return LoginRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<LoginRequest>): LoginRequest {
    const message = createBaseLoginRequest();
    message.name = object.name ?? "";
    message.pass = object.pass ?? "";
    return message;
  },
};

function createBaseLoginResponse(): LoginResponse {
  return { name: "", id: 0, refreshToken: "", accessToken: "", error: "" };
}

export const LoginResponse = {
  encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
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

  fromJSON(object: any): LoginResponse {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "",
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  create(base?: DeepPartial<LoginResponse>): LoginResponse {
    return LoginResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<LoginResponse>): LoginResponse {
    const message = createBaseLoginResponse();
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

  create(base?: DeepPartial<RefreshRequest>): RefreshRequest {
    return RefreshRequest.fromPartial(base ?? {});
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

  create(base?: DeepPartial<RefreshResponse>): RefreshResponse {
    return RefreshResponse.fromPartial(base ?? {});
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

  create(base?: DeepPartial<LogoutRequest>): LogoutRequest {
    return LogoutRequest.fromPartial(base ?? {});
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

  create(base?: DeepPartial<LogoutResponse>): LogoutResponse {
    return LogoutResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<LogoutResponse>): LogoutResponse {
    const message = createBaseLogoutResponse();
    return message;
  },
};

function createBaseValidateRequest(): ValidateRequest {
  return { accessToken: "" };
}

export const ValidateRequest = {
  encode(message: ValidateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
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
          message.accessToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidateRequest {
    return { accessToken: isSet(object.accessToken) ? String(object.accessToken) : "" };
  },

  toJSON(message: ValidateRequest): unknown {
    const obj: any = {};
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    return obj;
  },

  create(base?: DeepPartial<ValidateRequest>): ValidateRequest {
    return ValidateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ValidateRequest>): ValidateRequest {
    const message = createBaseValidateRequest();
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseValidateResponse(): ValidateResponse {
  return { id: 0, expiresAt: 0, issuedAt: 0 };
}

export const ValidateResponse = {
  encode(message: ValidateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.expiresAt !== 0) {
      writer.uint32(16).int64(message.expiresAt);
    }
    if (message.issuedAt !== 0) {
      writer.uint32(24).int64(message.issuedAt);
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
          message.id = reader.uint32();
          break;
        case 2:
          message.expiresAt = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.issuedAt = longToNumber(reader.int64() as Long);
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
      id: isSet(object.id) ? Number(object.id) : 0,
      expiresAt: isSet(object.expiresAt) ? Number(object.expiresAt) : 0,
      issuedAt: isSet(object.issuedAt) ? Number(object.issuedAt) : 0,
    };
  },

  toJSON(message: ValidateResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.expiresAt !== undefined && (obj.expiresAt = Math.round(message.expiresAt));
    message.issuedAt !== undefined && (obj.issuedAt = Math.round(message.issuedAt));
    return obj;
  },

  create(base?: DeepPartial<ValidateResponse>): ValidateResponse {
    return ValidateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ValidateResponse>): ValidateResponse {
    const message = createBaseValidateResponse();
    message.id = object.id ?? 0;
    message.expiresAt = object.expiresAt ?? 0;
    message.issuedAt = object.issuedAt ?? 0;
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
    login: {
      name: "Login",
      requestType: LoginRequest,
      requestStream: false,
      responseType: LoginResponse,
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
    getAdmin: {
      name: "GetAdmin",
      requestType: GetAdminRequest,
      requestStream: false,
      responseType: GetAdminResponse,
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
    getAdvertisingMessage: {
      name: "GetAdvertisingMessage",
      requestType: GetAdvertisingMessageRequest,
      requestStream: false,
      responseType: GetAdvertisingMessageResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AdminServiceImplementation<CallContextExt = {}> {
  create(request: CreateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CreateResponse>>;
  login(request: LoginRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LoginResponse>>;
  validate(request: ValidateRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ValidateResponse>>;
  refresh(request: RefreshRequest, context: CallContext & CallContextExt): Promise<DeepPartial<RefreshResponse>>;
  logout(request: LogoutRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LogoutResponse>>;
  getAdmin(request: GetAdminRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetAdminResponse>>;
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
  getAdvertisingMessage(
    request: GetAdvertisingMessageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetAdvertisingMessageResponse>>;
}

export interface AdminClient<CallOptionsExt = {}> {
  create(request: DeepPartial<CreateRequest>, options?: CallOptions & CallOptionsExt): Promise<CreateResponse>;
  login(request: DeepPartial<LoginRequest>, options?: CallOptions & CallOptionsExt): Promise<LoginResponse>;
  validate(request: DeepPartial<ValidateRequest>, options?: CallOptions & CallOptionsExt): Promise<ValidateResponse>;
  refresh(request: DeepPartial<RefreshRequest>, options?: CallOptions & CallOptionsExt): Promise<RefreshResponse>;
  logout(request: DeepPartial<LogoutRequest>, options?: CallOptions & CallOptionsExt): Promise<LogoutResponse>;
  getAdmin(request: DeepPartial<GetAdminRequest>, options?: CallOptions & CallOptionsExt): Promise<GetAdminResponse>;
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
  getAdvertisingMessage(
    request: DeepPartial<GetAdvertisingMessageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetAdvertisingMessageResponse>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
