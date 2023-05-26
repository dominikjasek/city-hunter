type ObjWithNonNullableFields<Obj extends object, RequiredKeys extends Array<keyof Obj>> = {
  [key in keyof Obj]: key extends RequiredKeys[number] ? NonNullable<Obj[key]> : Obj[key];
};

export const assertRequiredFields = <T extends object, ReqKeys extends (keyof T)[]>(
  obj: T,
  requiredFields: ReqKeys,
): ObjWithNonNullableFields<T, ReqKeys> => {
  for (const field of requiredFields) {
    if (obj[field] === null || obj[field] === undefined) {
      throw new Error(`Field ${field.toString()} is null or undefined`);
    }
  }

  return obj as ObjWithNonNullableFields<T, ReqKeys>;
};
