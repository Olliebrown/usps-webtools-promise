import type USPSClass from "../usps";
import type { ErrorResponse } from "../usps";
import callUSPS from "../utils/request";
import properCase from "../utils/proper-case";

export interface CityStateLookupRequest {
  ZipCode: {
    Zip5: string;
  };
}

export interface CityStateLookupResponse {
  Error?: ErrorResponse;
  ZipCode?: {
    City: string;
    State: string;
    Zip5: string;
  };
}

export default async function (
  this: USPSClass,
  zip: string
): Promise<CityStateLookupResponse["ZipCode"] | Error> {
  let response;
  try {
    response = (await callUSPS(
      "CityStateLookup",
      "CityStateLookup",
      "ZipCode",
      this.config,
      {
        ZipCode: {
          Zip5: zip,
        },
      }
    )) as CityStateLookupResponse["ZipCode"];
    if (response) {
      if (this.config.properCase) {
        response.City = properCase(response?.City);
      }
      return response;
    }
    throw new Error("Can't find result");
  } catch (error) {
    return error as Error;
  }
}
