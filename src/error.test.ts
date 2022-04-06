import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { sendError } from "./error";
import { Request, Response } from "express";

describe("sendError", () => {
  const mockRequest = () => {
    return {
      originalUrl: ""
    } as Request;
  };
  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should respond with an errorResponse object", async () => {
    const status = StatusCodes.INTERNAL_SERVER_ERROR;
    const message = "";
    const req = mockRequest();
    const res = mockResponse();

    sendError(req, res, status, message);

    const expectedResponse = {
      timestamp: new Date(),
      status,
      error: getReasonPhrase(status),
      message,
      path: ""
    };

    expect(res.send).toBeCalledWith(expectedResponse);
  });
});