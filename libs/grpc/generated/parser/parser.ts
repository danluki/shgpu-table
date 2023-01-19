/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "parser";

export interface GetFacultiesRequest {
}

export interface GetFacultiesResponse {
  faculties: Faculty[];
}

export interface Faculty {
  name: string;
  id: number;
}

export interface Pair {
  name: string;
  number: number;
  day: number;
  groupName: string;
  date: string;
}

export interface GetPairsByDaysRequest {
  groupName: string;
  offset: number;
  count: number;
}

export interface GetPairsByDatesRequest {
  groupName: string;
  dateBegin: Date | undefined;
  dateEnd: Date | undefined;
}

export interface GetPairsByLectuerRequest {
  lectuerName: string;
  weekBegin: Date | undefined;
  weekEnd: Date | undefined;
}

export interface GetPairsResponse {
  faculty: Faculty | undefined;
  pairs: Pair[];
}

export interface GetPairsByLectuerResponse {
  lectuerName: string;
  pairs: Pair[];
}

export interface GetGroupRequest {
  groupName: string;
}

export interface GetGroupResponse {
  groupName: string;
  facultyId: number;
  facultyName: string;
}

export interface ProcessTableRequest {
  facultyId: number;
  tableLink: string;
}

export interface ProcessTableResponse {
  facultyId: number;
  isNew: boolean;
  isUpdated: boolean;
  weekBegin: Date | undefined;
  weekEnd: Date | undefined;
  link: string;
}

export interface CheckLocalTableModifyDateRequest {
  facultyId: number;
  tableName: string;
}

export interface CheckLocalTableModifyDateResponse {
  modifyDate: Date | undefined;
}

export interface OnNewTableRequest {
  facultyId: number;
  tableLink: string;
  weekBegin: Date | undefined;
  weekEnd: Date | undefined;
}

export interface OnNewTableResponse {
}

export interface OnModifyTableRequest {
}

export interface OnModifyTableResponse {
  facultyId: number;
  tableLink: string;
  weekBegin: Date | undefined;
  weekEnd: Date | undefined;
}

function createBaseGetFacultiesRequest(): GetFacultiesRequest {
  return {};
}

export const GetFacultiesRequest = {
  encode(_: GetFacultiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFacultiesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFacultiesRequest();
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

  fromJSON(_: any): GetFacultiesRequest {
    return {};
  },

  toJSON(_: GetFacultiesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetFacultiesRequest>): GetFacultiesRequest {
    return GetFacultiesRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<GetFacultiesRequest>): GetFacultiesRequest {
    const message = createBaseGetFacultiesRequest();
    return message;
  },
};

function createBaseGetFacultiesResponse(): GetFacultiesResponse {
  return { faculties: [] };
}

export const GetFacultiesResponse = {
  encode(message: GetFacultiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.faculties) {
      Faculty.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFacultiesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFacultiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faculties.push(Faculty.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFacultiesResponse {
    return { faculties: Array.isArray(object?.faculties) ? object.faculties.map((e: any) => Faculty.fromJSON(e)) : [] };
  },

  toJSON(message: GetFacultiesResponse): unknown {
    const obj: any = {};
    if (message.faculties) {
      obj.faculties = message.faculties.map((e) => e ? Faculty.toJSON(e) : undefined);
    } else {
      obj.faculties = [];
    }
    return obj;
  },

  create(base?: DeepPartial<GetFacultiesResponse>): GetFacultiesResponse {
    return GetFacultiesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetFacultiesResponse>): GetFacultiesResponse {
    const message = createBaseGetFacultiesResponse();
    message.faculties = object.faculties?.map((e) => Faculty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFaculty(): Faculty {
  return { name: "", id: 0 };
}

export const Faculty = {
  encode(message: Faculty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Faculty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFaculty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.name = reader.string();
          break;
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Faculty {
    return { name: isSet(object.name) ? String(object.name) : "", id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: Faculty): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  create(base?: DeepPartial<Faculty>): Faculty {
    return Faculty.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Faculty>): Faculty {
    const message = createBaseFaculty();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBasePair(): Pair {
  return { name: "", number: 0, day: 0, groupName: "", date: "" };
}

export const Pair = {
  encode(message: Pair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.number !== 0) {
      writer.uint32(16).int32(message.number);
    }
    if (message.day !== 0) {
      writer.uint32(24).int32(message.day);
    }
    if (message.groupName !== "") {
      writer.uint32(34).string(message.groupName);
    }
    if (message.date !== "") {
      writer.uint32(42).string(message.date);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.number = reader.int32();
          break;
        case 3:
          message.day = reader.int32();
          break;
        case 4:
          message.groupName = reader.string();
          break;
        case 5:
          message.date = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Pair {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      number: isSet(object.number) ? Number(object.number) : 0,
      day: isSet(object.day) ? Number(object.day) : 0,
      groupName: isSet(object.groupName) ? String(object.groupName) : "",
      date: isSet(object.date) ? String(object.date) : "",
    };
  },

  toJSON(message: Pair): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.number !== undefined && (obj.number = Math.round(message.number));
    message.day !== undefined && (obj.day = Math.round(message.day));
    message.groupName !== undefined && (obj.groupName = message.groupName);
    message.date !== undefined && (obj.date = message.date);
    return obj;
  },

  create(base?: DeepPartial<Pair>): Pair {
    return Pair.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Pair>): Pair {
    const message = createBasePair();
    message.name = object.name ?? "";
    message.number = object.number ?? 0;
    message.day = object.day ?? 0;
    message.groupName = object.groupName ?? "";
    message.date = object.date ?? "";
    return message;
  },
};

function createBaseGetPairsByDaysRequest(): GetPairsByDaysRequest {
  return { groupName: "", offset: 0, count: 0 };
}

export const GetPairsByDaysRequest = {
  encode(message: GetPairsByDaysRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupName !== "") {
      writer.uint32(10).string(message.groupName);
    }
    if (message.offset !== 0) {
      writer.uint32(16).int32(message.offset);
    }
    if (message.count !== 0) {
      writer.uint32(24).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPairsByDaysRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPairsByDaysRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupName = reader.string();
          break;
        case 2:
          message.offset = reader.int32();
          break;
        case 3:
          message.count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPairsByDaysRequest {
    return {
      groupName: isSet(object.groupName) ? String(object.groupName) : "",
      offset: isSet(object.offset) ? Number(object.offset) : 0,
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: GetPairsByDaysRequest): unknown {
    const obj: any = {};
    message.groupName !== undefined && (obj.groupName = message.groupName);
    message.offset !== undefined && (obj.offset = Math.round(message.offset));
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  create(base?: DeepPartial<GetPairsByDaysRequest>): GetPairsByDaysRequest {
    return GetPairsByDaysRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetPairsByDaysRequest>): GetPairsByDaysRequest {
    const message = createBaseGetPairsByDaysRequest();
    message.groupName = object.groupName ?? "";
    message.offset = object.offset ?? 0;
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseGetPairsByDatesRequest(): GetPairsByDatesRequest {
  return { groupName: "", dateBegin: undefined, dateEnd: undefined };
}

export const GetPairsByDatesRequest = {
  encode(message: GetPairsByDatesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupName !== "") {
      writer.uint32(10).string(message.groupName);
    }
    if (message.dateBegin !== undefined) {
      Timestamp.encode(toTimestamp(message.dateBegin), writer.uint32(18).fork()).ldelim();
    }
    if (message.dateEnd !== undefined) {
      Timestamp.encode(toTimestamp(message.dateEnd), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPairsByDatesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPairsByDatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupName = reader.string();
          break;
        case 2:
          message.dateBegin = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.dateEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPairsByDatesRequest {
    return {
      groupName: isSet(object.groupName) ? String(object.groupName) : "",
      dateBegin: isSet(object.dateBegin) ? fromJsonTimestamp(object.dateBegin) : undefined,
      dateEnd: isSet(object.dateEnd) ? fromJsonTimestamp(object.dateEnd) : undefined,
    };
  },

  toJSON(message: GetPairsByDatesRequest): unknown {
    const obj: any = {};
    message.groupName !== undefined && (obj.groupName = message.groupName);
    message.dateBegin !== undefined && (obj.dateBegin = message.dateBegin.toISOString());
    message.dateEnd !== undefined && (obj.dateEnd = message.dateEnd.toISOString());
    return obj;
  },

  create(base?: DeepPartial<GetPairsByDatesRequest>): GetPairsByDatesRequest {
    return GetPairsByDatesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetPairsByDatesRequest>): GetPairsByDatesRequest {
    const message = createBaseGetPairsByDatesRequest();
    message.groupName = object.groupName ?? "";
    message.dateBegin = object.dateBegin ?? undefined;
    message.dateEnd = object.dateEnd ?? undefined;
    return message;
  },
};

function createBaseGetPairsByLectuerRequest(): GetPairsByLectuerRequest {
  return { lectuerName: "", weekBegin: undefined, weekEnd: undefined };
}

export const GetPairsByLectuerRequest = {
  encode(message: GetPairsByLectuerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lectuerName !== "") {
      writer.uint32(10).string(message.lectuerName);
    }
    if (message.weekBegin !== undefined) {
      Timestamp.encode(toTimestamp(message.weekBegin), writer.uint32(18).fork()).ldelim();
    }
    if (message.weekEnd !== undefined) {
      Timestamp.encode(toTimestamp(message.weekEnd), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPairsByLectuerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPairsByLectuerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lectuerName = reader.string();
          break;
        case 2:
          message.weekBegin = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.weekEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPairsByLectuerRequest {
    return {
      lectuerName: isSet(object.lectuerName) ? String(object.lectuerName) : "",
      weekBegin: isSet(object.weekBegin) ? fromJsonTimestamp(object.weekBegin) : undefined,
      weekEnd: isSet(object.weekEnd) ? fromJsonTimestamp(object.weekEnd) : undefined,
    };
  },

  toJSON(message: GetPairsByLectuerRequest): unknown {
    const obj: any = {};
    message.lectuerName !== undefined && (obj.lectuerName = message.lectuerName);
    message.weekBegin !== undefined && (obj.weekBegin = message.weekBegin.toISOString());
    message.weekEnd !== undefined && (obj.weekEnd = message.weekEnd.toISOString());
    return obj;
  },

  create(base?: DeepPartial<GetPairsByLectuerRequest>): GetPairsByLectuerRequest {
    return GetPairsByLectuerRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetPairsByLectuerRequest>): GetPairsByLectuerRequest {
    const message = createBaseGetPairsByLectuerRequest();
    message.lectuerName = object.lectuerName ?? "";
    message.weekBegin = object.weekBegin ?? undefined;
    message.weekEnd = object.weekEnd ?? undefined;
    return message;
  },
};

function createBaseGetPairsResponse(): GetPairsResponse {
  return { faculty: undefined, pairs: [] };
}

export const GetPairsResponse = {
  encode(message: GetPairsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.faculty !== undefined) {
      Faculty.encode(message.faculty, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pairs) {
      Pair.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPairsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPairsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faculty = Faculty.decode(reader, reader.uint32());
          break;
        case 2:
          message.pairs.push(Pair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPairsResponse {
    return {
      faculty: isSet(object.faculty) ? Faculty.fromJSON(object.faculty) : undefined,
      pairs: Array.isArray(object?.pairs) ? object.pairs.map((e: any) => Pair.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetPairsResponse): unknown {
    const obj: any = {};
    message.faculty !== undefined && (obj.faculty = message.faculty ? Faculty.toJSON(message.faculty) : undefined);
    if (message.pairs) {
      obj.pairs = message.pairs.map((e) => e ? Pair.toJSON(e) : undefined);
    } else {
      obj.pairs = [];
    }
    return obj;
  },

  create(base?: DeepPartial<GetPairsResponse>): GetPairsResponse {
    return GetPairsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetPairsResponse>): GetPairsResponse {
    const message = createBaseGetPairsResponse();
    message.faculty = (object.faculty !== undefined && object.faculty !== null)
      ? Faculty.fromPartial(object.faculty)
      : undefined;
    message.pairs = object.pairs?.map((e) => Pair.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetPairsByLectuerResponse(): GetPairsByLectuerResponse {
  return { lectuerName: "", pairs: [] };
}

export const GetPairsByLectuerResponse = {
  encode(message: GetPairsByLectuerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lectuerName !== "") {
      writer.uint32(18).string(message.lectuerName);
    }
    for (const v of message.pairs) {
      Pair.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPairsByLectuerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPairsByLectuerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.lectuerName = reader.string();
          break;
        case 3:
          message.pairs.push(Pair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPairsByLectuerResponse {
    return {
      lectuerName: isSet(object.lectuerName) ? String(object.lectuerName) : "",
      pairs: Array.isArray(object?.pairs) ? object.pairs.map((e: any) => Pair.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetPairsByLectuerResponse): unknown {
    const obj: any = {};
    message.lectuerName !== undefined && (obj.lectuerName = message.lectuerName);
    if (message.pairs) {
      obj.pairs = message.pairs.map((e) => e ? Pair.toJSON(e) : undefined);
    } else {
      obj.pairs = [];
    }
    return obj;
  },

  create(base?: DeepPartial<GetPairsByLectuerResponse>): GetPairsByLectuerResponse {
    return GetPairsByLectuerResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetPairsByLectuerResponse>): GetPairsByLectuerResponse {
    const message = createBaseGetPairsByLectuerResponse();
    message.lectuerName = object.lectuerName ?? "";
    message.pairs = object.pairs?.map((e) => Pair.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetGroupRequest(): GetGroupRequest {
  return { groupName: "" };
}

export const GetGroupRequest = {
  encode(message: GetGroupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupName !== "") {
      writer.uint32(10).string(message.groupName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGroupRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGroupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGroupRequest {
    return { groupName: isSet(object.groupName) ? String(object.groupName) : "" };
  },

  toJSON(message: GetGroupRequest): unknown {
    const obj: any = {};
    message.groupName !== undefined && (obj.groupName = message.groupName);
    return obj;
  },

  create(base?: DeepPartial<GetGroupRequest>): GetGroupRequest {
    return GetGroupRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetGroupRequest>): GetGroupRequest {
    const message = createBaseGetGroupRequest();
    message.groupName = object.groupName ?? "";
    return message;
  },
};

function createBaseGetGroupResponse(): GetGroupResponse {
  return { groupName: "", facultyId: 0, facultyName: "" };
}

export const GetGroupResponse = {
  encode(message: GetGroupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupName !== "") {
      writer.uint32(10).string(message.groupName);
    }
    if (message.facultyId !== 0) {
      writer.uint32(16).int32(message.facultyId);
    }
    if (message.facultyName !== "") {
      writer.uint32(26).string(message.facultyName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGroupResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupName = reader.string();
          break;
        case 2:
          message.facultyId = reader.int32();
          break;
        case 3:
          message.facultyName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGroupResponse {
    return {
      groupName: isSet(object.groupName) ? String(object.groupName) : "",
      facultyId: isSet(object.facultyId) ? Number(object.facultyId) : 0,
      facultyName: isSet(object.facultyName) ? String(object.facultyName) : "",
    };
  },

  toJSON(message: GetGroupResponse): unknown {
    const obj: any = {};
    message.groupName !== undefined && (obj.groupName = message.groupName);
    message.facultyId !== undefined && (obj.facultyId = Math.round(message.facultyId));
    message.facultyName !== undefined && (obj.facultyName = message.facultyName);
    return obj;
  },

  create(base?: DeepPartial<GetGroupResponse>): GetGroupResponse {
    return GetGroupResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetGroupResponse>): GetGroupResponse {
    const message = createBaseGetGroupResponse();
    message.groupName = object.groupName ?? "";
    message.facultyId = object.facultyId ?? 0;
    message.facultyName = object.facultyName ?? "";
    return message;
  },
};

function createBaseProcessTableRequest(): ProcessTableRequest {
  return { facultyId: 0, tableLink: "" };
}

export const ProcessTableRequest = {
  encode(message: ProcessTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.facultyId !== 0) {
      writer.uint32(8).int32(message.facultyId);
    }
    if (message.tableLink !== "") {
      writer.uint32(18).string(message.tableLink);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessTableRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.facultyId = reader.int32();
          break;
        case 2:
          message.tableLink = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTableRequest {
    return {
      facultyId: isSet(object.facultyId) ? Number(object.facultyId) : 0,
      tableLink: isSet(object.tableLink) ? String(object.tableLink) : "",
    };
  },

  toJSON(message: ProcessTableRequest): unknown {
    const obj: any = {};
    message.facultyId !== undefined && (obj.facultyId = Math.round(message.facultyId));
    message.tableLink !== undefined && (obj.tableLink = message.tableLink);
    return obj;
  },

  create(base?: DeepPartial<ProcessTableRequest>): ProcessTableRequest {
    return ProcessTableRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProcessTableRequest>): ProcessTableRequest {
    const message = createBaseProcessTableRequest();
    message.facultyId = object.facultyId ?? 0;
    message.tableLink = object.tableLink ?? "";
    return message;
  },
};

function createBaseProcessTableResponse(): ProcessTableResponse {
  return { facultyId: 0, isNew: false, isUpdated: false, weekBegin: undefined, weekEnd: undefined, link: "" };
}

export const ProcessTableResponse = {
  encode(message: ProcessTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.facultyId !== 0) {
      writer.uint32(8).int32(message.facultyId);
    }
    if (message.isNew === true) {
      writer.uint32(16).bool(message.isNew);
    }
    if (message.isUpdated === true) {
      writer.uint32(24).bool(message.isUpdated);
    }
    if (message.weekBegin !== undefined) {
      Timestamp.encode(toTimestamp(message.weekBegin), writer.uint32(34).fork()).ldelim();
    }
    if (message.weekEnd !== undefined) {
      Timestamp.encode(toTimestamp(message.weekEnd), writer.uint32(42).fork()).ldelim();
    }
    if (message.link !== "") {
      writer.uint32(50).string(message.link);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessTableResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessTableResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.facultyId = reader.int32();
          break;
        case 2:
          message.isNew = reader.bool();
          break;
        case 3:
          message.isUpdated = reader.bool();
          break;
        case 4:
          message.weekBegin = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.weekEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.link = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTableResponse {
    return {
      facultyId: isSet(object.facultyId) ? Number(object.facultyId) : 0,
      isNew: isSet(object.isNew) ? Boolean(object.isNew) : false,
      isUpdated: isSet(object.isUpdated) ? Boolean(object.isUpdated) : false,
      weekBegin: isSet(object.weekBegin) ? fromJsonTimestamp(object.weekBegin) : undefined,
      weekEnd: isSet(object.weekEnd) ? fromJsonTimestamp(object.weekEnd) : undefined,
      link: isSet(object.link) ? String(object.link) : "",
    };
  },

  toJSON(message: ProcessTableResponse): unknown {
    const obj: any = {};
    message.facultyId !== undefined && (obj.facultyId = Math.round(message.facultyId));
    message.isNew !== undefined && (obj.isNew = message.isNew);
    message.isUpdated !== undefined && (obj.isUpdated = message.isUpdated);
    message.weekBegin !== undefined && (obj.weekBegin = message.weekBegin.toISOString());
    message.weekEnd !== undefined && (obj.weekEnd = message.weekEnd.toISOString());
    message.link !== undefined && (obj.link = message.link);
    return obj;
  },

  create(base?: DeepPartial<ProcessTableResponse>): ProcessTableResponse {
    return ProcessTableResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProcessTableResponse>): ProcessTableResponse {
    const message = createBaseProcessTableResponse();
    message.facultyId = object.facultyId ?? 0;
    message.isNew = object.isNew ?? false;
    message.isUpdated = object.isUpdated ?? false;
    message.weekBegin = object.weekBegin ?? undefined;
    message.weekEnd = object.weekEnd ?? undefined;
    message.link = object.link ?? "";
    return message;
  },
};

function createBaseCheckLocalTableModifyDateRequest(): CheckLocalTableModifyDateRequest {
  return { facultyId: 0, tableName: "" };
}

export const CheckLocalTableModifyDateRequest = {
  encode(message: CheckLocalTableModifyDateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.facultyId !== 0) {
      writer.uint32(8).int32(message.facultyId);
    }
    if (message.tableName !== "") {
      writer.uint32(18).string(message.tableName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckLocalTableModifyDateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckLocalTableModifyDateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.facultyId = reader.int32();
          break;
        case 2:
          message.tableName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CheckLocalTableModifyDateRequest {
    return {
      facultyId: isSet(object.facultyId) ? Number(object.facultyId) : 0,
      tableName: isSet(object.tableName) ? String(object.tableName) : "",
    };
  },

  toJSON(message: CheckLocalTableModifyDateRequest): unknown {
    const obj: any = {};
    message.facultyId !== undefined && (obj.facultyId = Math.round(message.facultyId));
    message.tableName !== undefined && (obj.tableName = message.tableName);
    return obj;
  },

  create(base?: DeepPartial<CheckLocalTableModifyDateRequest>): CheckLocalTableModifyDateRequest {
    return CheckLocalTableModifyDateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CheckLocalTableModifyDateRequest>): CheckLocalTableModifyDateRequest {
    const message = createBaseCheckLocalTableModifyDateRequest();
    message.facultyId = object.facultyId ?? 0;
    message.tableName = object.tableName ?? "";
    return message;
  },
};

function createBaseCheckLocalTableModifyDateResponse(): CheckLocalTableModifyDateResponse {
  return { modifyDate: undefined };
}

export const CheckLocalTableModifyDateResponse = {
  encode(message: CheckLocalTableModifyDateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.modifyDate !== undefined) {
      Timestamp.encode(toTimestamp(message.modifyDate), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckLocalTableModifyDateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckLocalTableModifyDateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modifyDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CheckLocalTableModifyDateResponse {
    return { modifyDate: isSet(object.modifyDate) ? fromJsonTimestamp(object.modifyDate) : undefined };
  },

  toJSON(message: CheckLocalTableModifyDateResponse): unknown {
    const obj: any = {};
    message.modifyDate !== undefined && (obj.modifyDate = message.modifyDate.toISOString());
    return obj;
  },

  create(base?: DeepPartial<CheckLocalTableModifyDateResponse>): CheckLocalTableModifyDateResponse {
    return CheckLocalTableModifyDateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CheckLocalTableModifyDateResponse>): CheckLocalTableModifyDateResponse {
    const message = createBaseCheckLocalTableModifyDateResponse();
    message.modifyDate = object.modifyDate ?? undefined;
    return message;
  },
};

function createBaseOnNewTableRequest(): OnNewTableRequest {
  return { facultyId: 0, tableLink: "", weekBegin: undefined, weekEnd: undefined };
}

export const OnNewTableRequest = {
  encode(message: OnNewTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.facultyId !== 0) {
      writer.uint32(8).int32(message.facultyId);
    }
    if (message.tableLink !== "") {
      writer.uint32(18).string(message.tableLink);
    }
    if (message.weekBegin !== undefined) {
      Timestamp.encode(toTimestamp(message.weekBegin), writer.uint32(26).fork()).ldelim();
    }
    if (message.weekEnd !== undefined) {
      Timestamp.encode(toTimestamp(message.weekEnd), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnNewTableRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnNewTableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.facultyId = reader.int32();
          break;
        case 2:
          message.tableLink = reader.string();
          break;
        case 3:
          message.weekBegin = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.weekEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OnNewTableRequest {
    return {
      facultyId: isSet(object.facultyId) ? Number(object.facultyId) : 0,
      tableLink: isSet(object.tableLink) ? String(object.tableLink) : "",
      weekBegin: isSet(object.weekBegin) ? fromJsonTimestamp(object.weekBegin) : undefined,
      weekEnd: isSet(object.weekEnd) ? fromJsonTimestamp(object.weekEnd) : undefined,
    };
  },

  toJSON(message: OnNewTableRequest): unknown {
    const obj: any = {};
    message.facultyId !== undefined && (obj.facultyId = Math.round(message.facultyId));
    message.tableLink !== undefined && (obj.tableLink = message.tableLink);
    message.weekBegin !== undefined && (obj.weekBegin = message.weekBegin.toISOString());
    message.weekEnd !== undefined && (obj.weekEnd = message.weekEnd.toISOString());
    return obj;
  },

  create(base?: DeepPartial<OnNewTableRequest>): OnNewTableRequest {
    return OnNewTableRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OnNewTableRequest>): OnNewTableRequest {
    const message = createBaseOnNewTableRequest();
    message.facultyId = object.facultyId ?? 0;
    message.tableLink = object.tableLink ?? "";
    message.weekBegin = object.weekBegin ?? undefined;
    message.weekEnd = object.weekEnd ?? undefined;
    return message;
  },
};

function createBaseOnNewTableResponse(): OnNewTableResponse {
  return {};
}

export const OnNewTableResponse = {
  encode(_: OnNewTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnNewTableResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnNewTableResponse();
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

  fromJSON(_: any): OnNewTableResponse {
    return {};
  },

  toJSON(_: OnNewTableResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<OnNewTableResponse>): OnNewTableResponse {
    return OnNewTableResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OnNewTableResponse>): OnNewTableResponse {
    const message = createBaseOnNewTableResponse();
    return message;
  },
};

function createBaseOnModifyTableRequest(): OnModifyTableRequest {
  return {};
}

export const OnModifyTableRequest = {
  encode(_: OnModifyTableRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnModifyTableRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnModifyTableRequest();
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

  fromJSON(_: any): OnModifyTableRequest {
    return {};
  },

  toJSON(_: OnModifyTableRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<OnModifyTableRequest>): OnModifyTableRequest {
    return OnModifyTableRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OnModifyTableRequest>): OnModifyTableRequest {
    const message = createBaseOnModifyTableRequest();
    return message;
  },
};

function createBaseOnModifyTableResponse(): OnModifyTableResponse {
  return { facultyId: 0, tableLink: "", weekBegin: undefined, weekEnd: undefined };
}

export const OnModifyTableResponse = {
  encode(message: OnModifyTableResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.facultyId !== 0) {
      writer.uint32(8).int32(message.facultyId);
    }
    if (message.tableLink !== "") {
      writer.uint32(18).string(message.tableLink);
    }
    if (message.weekBegin !== undefined) {
      Timestamp.encode(toTimestamp(message.weekBegin), writer.uint32(26).fork()).ldelim();
    }
    if (message.weekEnd !== undefined) {
      Timestamp.encode(toTimestamp(message.weekEnd), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnModifyTableResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnModifyTableResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.facultyId = reader.int32();
          break;
        case 2:
          message.tableLink = reader.string();
          break;
        case 3:
          message.weekBegin = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.weekEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OnModifyTableResponse {
    return {
      facultyId: isSet(object.facultyId) ? Number(object.facultyId) : 0,
      tableLink: isSet(object.tableLink) ? String(object.tableLink) : "",
      weekBegin: isSet(object.weekBegin) ? fromJsonTimestamp(object.weekBegin) : undefined,
      weekEnd: isSet(object.weekEnd) ? fromJsonTimestamp(object.weekEnd) : undefined,
    };
  },

  toJSON(message: OnModifyTableResponse): unknown {
    const obj: any = {};
    message.facultyId !== undefined && (obj.facultyId = Math.round(message.facultyId));
    message.tableLink !== undefined && (obj.tableLink = message.tableLink);
    message.weekBegin !== undefined && (obj.weekBegin = message.weekBegin.toISOString());
    message.weekEnd !== undefined && (obj.weekEnd = message.weekEnd.toISOString());
    return obj;
  },

  create(base?: DeepPartial<OnModifyTableResponse>): OnModifyTableResponse {
    return OnModifyTableResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OnModifyTableResponse>): OnModifyTableResponse {
    const message = createBaseOnModifyTableResponse();
    message.facultyId = object.facultyId ?? 0;
    message.tableLink = object.tableLink ?? "";
    message.weekBegin = object.weekBegin ?? undefined;
    message.weekEnd = object.weekEnd ?? undefined;
    return message;
  },
};

export type ParserDefinition = typeof ParserDefinition;
export const ParserDefinition = {
  name: "Parser",
  fullName: "parser.Parser",
  methods: {
    processTable: {
      name: "processTable",
      requestType: ProcessTableRequest,
      requestStream: false,
      responseType: ProcessTableResponse,
      responseStream: false,
      options: {},
    },
    getGroup: {
      name: "getGroup",
      requestType: GetGroupRequest,
      requestStream: false,
      responseType: GetGroupResponse,
      responseStream: false,
      options: {},
    },
    getFaculties: {
      name: "getFaculties",
      requestType: GetFacultiesRequest,
      requestStream: false,
      responseType: GetFacultiesResponse,
      responseStream: false,
      options: {},
    },
    getPairsByDays: {
      name: "getPairsByDays",
      requestType: GetPairsByDaysRequest,
      requestStream: false,
      responseType: GetPairsResponse,
      responseStream: false,
      options: {},
    },
    getPairsByDates: {
      name: "getPairsByDates",
      requestType: GetPairsByDatesRequest,
      requestStream: false,
      responseType: GetPairsResponse,
      responseStream: false,
      options: {},
    },
    getPairsByLectuer: {
      name: "getPairsByLectuer",
      requestType: GetPairsByLectuerRequest,
      requestStream: false,
      responseType: GetPairsByLectuerResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ParserServiceImplementation<CallContextExt = {}> {
  processTable(
    request: ProcessTableRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProcessTableResponse>>;
  getGroup(request: GetGroupRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetGroupResponse>>;
  getFaculties(
    request: GetFacultiesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetFacultiesResponse>>;
  getPairsByDays(
    request: GetPairsByDaysRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetPairsResponse>>;
  getPairsByDates(
    request: GetPairsByDatesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetPairsResponse>>;
  getPairsByLectuer(
    request: GetPairsByLectuerRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetPairsByLectuerResponse>>;
}

export interface ParserClient<CallOptionsExt = {}> {
  processTable(
    request: DeepPartial<ProcessTableRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProcessTableResponse>;
  getGroup(request: DeepPartial<GetGroupRequest>, options?: CallOptions & CallOptionsExt): Promise<GetGroupResponse>;
  getFaculties(
    request: DeepPartial<GetFacultiesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetFacultiesResponse>;
  getPairsByDays(
    request: DeepPartial<GetPairsByDaysRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetPairsResponse>;
  getPairsByDates(
    request: DeepPartial<GetPairsByDatesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetPairsResponse>;
  getPairsByLectuer(
    request: DeepPartial<GetPairsByLectuerRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetPairsByLectuerResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
