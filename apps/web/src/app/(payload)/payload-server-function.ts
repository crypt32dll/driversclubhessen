"use server";

import { handleServerFunctions } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";

import config from "@payload-config";

import { importMap } from "./admin/importMap.js";

/** Passed into Payload `RootLayout` → `RootProvider` (client); must be a server action in React 19 / Next 16. */
export const payloadServerFunction: ServerFunctionClient = async (args) =>
  handleServerFunctions({
    ...args,
    config,
    importMap,
  });
