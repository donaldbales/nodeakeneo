import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import { get, patch } from './http';
import { AssociationType } from './interfaces/AssociationType';
import { Attribute } from './interfaces/Attribute';
import { AttributeGroup } from './interfaces/AttributeGroup';
import { AttributeOption } from './interfaces/AttributeOption';
import { Category } from './interfaces/Category';
import { Channel } from './interfaces/Channel';
import { Currency } from './interfaces/Currency';
import { Family } from './interfaces/Family';
import { FamilyVariant } from './interfaces/FamilyVariant';
import { Locale } from './interfaces/Locale';
import { MeasureFamily } from './interfaces/MeasureFamily';
import { Product } from './interfaces/Product';
import { ProductModel } from './interfaces/ProductModel';
import { ReferenceEntity } from './interfaces/ReferenceEntity';
import { ReferenceEntityAttribute } from './interfaces/ReferenceEntityAttribute';
import { ReferenceEntityAttributeOption } from './interfaces/ReferenceEntityAttributeOption';

import { getLogger } from './logger';
const logger: any = getLogger('nodeakeneo');

const moduleName: string = 'akeneo';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const OK: any = { status: 'OK' };

const filenameAssociationTypes: string = 'associationTypes.json';
const filenameAttributes: string = 'attributes.json';
const filenameAttributeGroups: string = 'attributeGroups.json';
const filenameAttributeOptions: string = 'attributeOptions.json';
const filenameCategories: string = 'categories.json';
const filenameChannels: string = 'channels.json';
const filenameCurrencies: string = 'currencies.json';
const filenameFamilies: string = 'families.json';
const filenameFamilyVariants: string = 'familyVariants.json';
const filenameLocales: string = 'locales.json';
const filenameMeasureFamilies: string = 'measureFamilies.json';
const filenameProducts: string = 'products.json';
const filenameProductModels: string = 'productModels.json';
const filenameReferenceEntities: string = 'referenceEntities.json';
const filenameReferenceEntityAttributes: string = 'referenceEntityAttributes.json';
const filenameReferenceEntityAttributeOptions: string = 'referenceEntityAttributeOptions.json';
const filenameReferenceEntityRecords: string = 'referenceEntityRecords.json';

const close: any = util.promisify(fs.close);
const open: any = util.promisify(fs.open);
const read: any = util.promisify(fs.readFile);
const unlink: any = util.promisify(fs.unlink);
const write: any = util.promisify(fs.write);

// Catalog APIs

export function apiUrlFamilies(): string {
  return '/api/rest/v1/families';
}

export function apiUrlFamilyVariants(familyCode: string): string {
  return `${apiUrlFamilies()}/${familyCode}/variants`;
}

export function apiUrlAttributes(): string {
  return '/api/rest/v1/attributes';
}

export function apiUrlAttributeOptions(attributeCode: string): string {
  return `${apiUrlAttributes()}/${attributeCode}/options`;
}

export function apiUrlAttributeGroups(): string {
  return '/api/rest/v1/attribute-groups';
}

export function apiUrlAssociationTypes(): string {
  return '/api/rest/v1/association-types';
}

export function apiUrlCategories(): string {
  return '/api/rest/v1/categories';
}

// Product APIs

export function apiUrlProducts(): string {
  return '/api/rest/v1/products';
}

export function apiUrlProductModels(): string {
  return '/api/rest/v1/product-models';
}

export function apiUrlPublishedProducts(): string {
  return '/api/rest/v1/published-products';
}

export function apiUrlProductMediaFiles(): string {
  return '/api/rest/v1/media-files';
}

// Target Market

export function apiUrlChannels(): string {
  return '/api/rest/v1/channels';
}

export function apiUrlLocales(): string {
  return '/api/rest/v1/locales';
}

export function apiUrlCurrencies(): string {
  return '/api/rest/v1/currencies';
}

export function apiUrlMeasureFamilies(): string {
  return '/api/rest/v1/measure-families';
}

// Reference Entities

export function apiUrlReferenceEntities(): string {
  return '/api/rest/v1/reference-entities';
}

export function apiUrlReferenceEntityAttributes(referenceEntityCode: string): string {
  return `/api/rest/v1/reference-entities/${referenceEntityCode}/attributes`;
}

export function apiUrlReferenceEntityAttributeOptions(referenceEntityCode: string, attributeCode: string) {
  return `/api/rest/v1/reference-entities/${referenceEntityCode}/attributes/${attributeCode}/options`;
}

export function apiUrlReferenceEntityRecords(referenceEntityCode: string): string {
  return `/api/rest/v1/reference-entities/${referenceEntityCode}/records`;
}

export function apiUrlReferenceEntityMediaFiles(): string {
  return '/api/rest/v1/reference-entities-media-files';
}

// PAM

export function apiUrlAssets(): string {
  return `/api/rest/v1/assets`;
}

export function apiUrlAssetReferenceFiles(assetCode: string, localeCode: string): string {
  return `/api/rest/v1/assets/${assetCode}/reference-files/${localeCode}`;
}

export function apiUrlAssetVariationFiles(assetCode: string, channelCode: string, localeCode: string): string {
  return `/api/rest/v1/assets/${assetCode}/variation-files/${channelCode}/${localeCode}`;
}

export function apiUrlAssetCategories(): string {
  return '/api/rest/v1/asset-categories';
}

export function apiUrlAssetTags(): string {
  return '/api/rest/v1/asset-tags';
}

export async function importAssociationTypes(): Promise<any> {
  const methodName: string = 'importAssociationTypes';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameAssociationTypes);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const associationTypes: AssociationType[] = JSON.parse(`[ ${buffer} ]`);
    const results = await patch(apiUrlAssociationTypes(), associationTypes);
    logger.info({ moduleName, methodName, results });
  }
  return OK;
}

export async function importAttributes(): Promise<any> {
  const methodName: string = 'importAttributes';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameAttributes);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const attributes: Attribute[] = JSON.parse(`[ ${buffer} ]`);
    const results = await patch(apiUrlAttributes(), attributes);
    logger.info({ moduleName, methodName, results });
  }
  return OK;
}

export async function importAttributeGroups(): Promise<any> {
  const methodName: string = 'importAttributeGroups';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameAttributeGroups);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const attributeGroups: Attribute[] = JSON.parse(`[ ${buffer} ]`);
    const results = await patch(apiUrlAttributeGroups(), attributeGroups);
    logger.info({ moduleName, methodName, results });
  }
  return OK;
}

export async function importAttributeOptions(): Promise<any> {
  const methodName: string = 'importAttributeOptions';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameAttributeOptions);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const attributeOptions: AttributeOption[] = JSON.parse(`[ ${buffer} ]`);
    if (attributeOptions.length > 0 &&
        attributeOptions[0].attribute) {
      let attributeCode: string = attributeOptions[0].attribute || '';
      let attributeCodeAttributeOptions: any[] = [];
      for (let i = 0; i < attributeOptions.length; i++) {
        if (attributeCode !== attributeOptions[i].attribute ||
           (i + 1) === attributeOptions.length) {
          const results = await patch(apiUrlAttributeOptions(attributeCode), attributeCodeAttributeOptions);
          logger.info({ moduleName, methodName, results });
          attributeCode = attributeOptions[i].attribute || '';
          attributeCodeAttributeOptions = [];
        }
        const attributeOption: any = attributeOptions[i];
        attributeCodeAttributeOptions.push(attributeOption);
      }
    }
  }
  return OK;
}

export async function importCategories(): Promise<any> {
  const methodName: string = 'importCategories';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameCategories);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const categories: Category[] = JSON.parse(`[ ${buffer} ]`);
    const results = await patch(apiUrlCategories(), categories);
    logger.info({ moduleName, methodName, results });
  }
  return OK;
}

export async function importChannels(): Promise<any> {
  const methodName: string = 'importChannels';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameChannels);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const channels: Channel[] = JSON.parse(`[ ${buffer} ]`);
    const results = await patch(apiUrlChannels(), channels);
    logger.info({ moduleName, methodName, results });
  }
  return OK;
}

// N/A: export async function importCurrencies(): Promise<any> {

export async function importFamilies(): Promise<any> {
  const methodName: string = 'importFamilies';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameFamilies);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const families: Family[] = JSON.parse(`[ ${buffer} ]`);
    const results = await patch(apiUrlFamilies(), families);
    logger.info({ moduleName, methodName, results });
  }
  return OK;
}

export async function importFamilyVariants(): Promise<any> {
  const methodName: string = 'importFamilyVariants';
  logger.info({ moduleName, methodName }, 'Starting...');

  const fileName: string = path.join(exportPath, filenameFamilyVariants);
  const fileDesc: number = await open(fileName, 'r');
  const buffer: string = (await read(fileDesc)).toString().replace(/\n/gi, ', ').slice(0, -2);
  await close(fileDesc);
  if (buffer.length > 0) {
    const familyVariants: FamilyVariant[] = JSON.parse(`[ ${buffer} ]`);
    if (familyVariants.length > 0 &&
        familyVariants[0].family) {
      let familyCode: string = familyVariants[0].family || '';
      let familyCodeFamilyVariants: any[] = [];
      for (let i = 0; i < familyVariants.length; i++) {
        if (familyCode !== familyVariants[i].family ||
           (i + 1) === familyVariants.length) {
          const results = await patch(apiUrlFamilyVariants(familyCode), familyCodeFamilyVariants);
          logger.info({ moduleName, methodName, results });
          familyCode = familyVariants[i].family || '';
          familyCodeFamilyVariants = [];
        }
        const familyVariant: any = familyVariants[i];
        delete familyVariant.family;
        familyCodeFamilyVariants.push(familyVariant);
      }
    }
  }
  return OK;
}

// N/A: export async function importLocales(): Promise<any> {
// N/A: export async function importMeasureFamilies(): Promise<any> {

// TODO: export async function importProducts(): Promise<any> {
// TODO: export async function importProductModels(): Promise<any> {
// TODO: export async function importReferenceEntities(): Promise<any> {
// TODO: export async function importReferenceEntityAttributes(referenceEntityCode: string): Promise<any> {
// TODO: export async function importReferenceEntityAttributeOptions(referenceEntityCode: string,

export async function exportAssociationTypes(): Promise<any> {
  const methodName: string = 'exportAssociationTypes';
  logger.info({ moduleName, methodName }, 'Starting...');

  let associationTypes: AssociationType[];
  try {
    associationTypes = await get(apiUrlAssociationTypes());
    logger.debug({ moduleName, methodName, associationTypes });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (associationTypes !== null &&
      typeof associationTypes[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameAssociationTypes);
    const fileDesc: number = await open(fileName, 'w');
    for (const associationType of associationTypes) {
      await write(fileDesc, Buffer.from(JSON.stringify(associationType) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportAttributes(): Promise<any> {
  const methodName: string = 'exportAttributes';
  logger.info({ moduleName, methodName }, 'Starting...');

  try {
    await unlink(path.join(exportPath, filenameAttributeOptions));
  } catch (err) {
    if (err.code !== 'ENOENT') {
      logger.error({ moduleName, methodName, err });
    }
  }

  const attributes: Attribute[] = await get(apiUrlAttributes());
  logger.debug({ moduleName, methodName, attributes });

  if (attributes !== null &&
      typeof attributes[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, 'attributes.json');
    const fileDesc: number = await open(fileName, 'w');
    for (const attribute of attributes) {
      await write(fileDesc, Buffer.from(JSON.stringify(attribute) + '\n'));
      if (attribute.type === 'pim_catalog_simpleselect' ||
          attribute.type === 'pim_catalog_multiselect') {
        try {
          await exportAttributeOptions(attribute.code);
        } catch (err) {
          logger.info({ moduleName, methodName, err });
          return err;
        }
      }
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportAttributeGroups(): Promise<any> {
  const methodName: string = 'exportAttributeGroups';
  logger.info({ moduleName, methodName }, 'Starting...');

  let attributeGroups: AttributeGroup[];
  try {
    attributeGroups = await get(apiUrlAttributeGroups());
    logger.debug({ moduleName, methodName, attributeGroups });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (attributeGroups !== null &&
      typeof attributeGroups[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameAttributeGroups);
    const fileDesc: number = await open(fileName, 'w');
    for (const attributeGroup of attributeGroups) {
      await write(fileDesc, Buffer.from(JSON.stringify(attributeGroup) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportAttributeOptions(attributeCode: string): Promise<any> {
  const methodName: string = 'exportAttributeOptions';
  logger.info({ moduleName, methodName, attributeCode }, 'Starting...');

  let attributeOptions: AttributeOption[];
  try {
    attributeOptions = await get(apiUrlAttributeOptions(attributeCode));
    logger.debug({ moduleName, methodName, attributeOptions });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (attributeOptions !== null &&
      typeof attributeOptions[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameAttributeOptions);
    const fileDesc: number = await open(fileName, 'a');
    for (const attributeOption of attributeOptions) {
      await write(fileDesc, Buffer.from(JSON.stringify(attributeOption) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportCategories(): Promise<any> {
  const methodName: string = 'exportCategories';
  logger.info({ moduleName, methodName }, 'Starting...');

  let categories: Category[];
  try {
    categories = await get(apiUrlCategories());
    logger.debug({ moduleName, methodName, categories });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (categories !== null &&
      typeof categories[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameCategories);
    const fileDesc: number = await open(fileName, 'w');
    for (const category of categories) {
      await write(fileDesc, Buffer.from(JSON.stringify(category) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportChannels(): Promise<any> {
  const methodName: string = 'exportChannels';
  logger.info({ moduleName, methodName }, 'Starting...');

  let channels: Channel[];
  try {
    channels = await get(apiUrlChannels());
    logger.debug({ moduleName, methodName, channels });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (channels !== null &&
      typeof channels[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameChannels);
    const fileDesc: number = await open(fileName, 'w');
    for (const channel of channels) {
      await write(fileDesc, Buffer.from(JSON.stringify(channel) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportCurrencies(): Promise<any> {
  const methodName: string = 'exportCurrencies';
  logger.info({ moduleName, methodName }, 'Starting...');

  let currencies: Currency[];
  try {
    currencies = await get(apiUrlCurrencies());
    logger.debug({ moduleName, methodName, currencies });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (currencies !== null &&
      typeof currencies[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameCurrencies);
    const fileDesc: number = await open(fileName, 'w');
    for (const currency of currencies) {
      await write(fileDesc, Buffer.from(JSON.stringify(currency) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportFamilies(): Promise<any> {
  const methodName: string = 'exportFamilies';
  logger.info({ moduleName, methodName }, 'Starting...');

  try {
    await unlink(path.join(exportPath, filenameFamilyVariants));
  } catch (err) {
    if (err.code !== 'ENOENT') {
      logger.error({ moduleName, methodName, err });
    }
  }

  let families: Family[];
  try {
    families = await get(apiUrlFamilies());
    logger.debug({ moduleName, methodName, families });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (families !== null &&
      typeof families[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameFamilies);
    const fileDesc: number = await open(fileName, 'w');
    for (const family of families) {
      await write(fileDesc, Buffer.from(JSON.stringify(family) + '\n'));
      try {
        await exportFamilyVariants(family.code);
      } catch (err) {
        logger.info({ moduleName, methodName, err });
        return err;
      }
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportFamilyVariants(familyCode: string): Promise<any> {
  const methodName: string = 'exportFamilyVariants';
  logger.info({ moduleName, methodName, familyCode }, 'Starting...');

  let familyVariants: FamilyVariant[];
  try {
    familyVariants = await get(apiUrlFamilyVariants(familyCode));
    logger.debug({ moduleName, methodName, familyVariants });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (familyVariants !== null &&
      typeof familyVariants[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameFamilyVariants);
    const fileDesc: number = await open(fileName, 'a');
    for (const familyVariant of familyVariants) {
      // NOTE: I had to add attribute family. Even though the doc says it's
      //       not needed, it doesn't work without it.
      if (!(familyVariant.family)) {
        familyVariant.family = familyCode;
      }
      await write(fileDesc, Buffer.from(JSON.stringify(familyVariant) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportLocales(): Promise<any> {
  const methodName: string = 'exportLocales';
  logger.info({ moduleName, methodName }, 'Starting...');

  let locales: Locale[];
  try {
    locales = await get(apiUrlLocales());
    logger.debug({ moduleName, methodName, locales });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (locales !== null &&
      typeof locales[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameLocales);
    const fileDesc: number = await open(fileName, 'w');
    for (const locale of locales) {
      await write(fileDesc, Buffer.from(JSON.stringify(locale) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportMeasureFamilies(): Promise<any> {
  const methodName: string = 'exportMeasureFamilies';
  logger.info({ moduleName, methodName }, 'Starting...');

  let measureFamilies: MeasureFamily[];
  try {
    measureFamilies = await get(apiUrlMeasureFamilies());
    logger.debug({ moduleName, methodName, measureFamilies });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (measureFamilies !== null &&
      typeof measureFamilies[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameMeasureFamilies);
    const fileDesc: number = await open(fileName, 'w');
    for (const measureFamily of measureFamilies) {
      await write(fileDesc, Buffer.from(JSON.stringify(measureFamily) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportProducts(): Promise<any> {
  const methodName: string = 'exportProduct';
  logger.info({ moduleName, methodName }, 'Starting...');

  let products: Product[];
  try {
    products = await get(apiUrlProducts());
    logger.debug({ moduleName, methodName, products });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (products !== null &&
      typeof products[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameProducts);
    const fileDesc: number = await open(fileName, 'w');
    for (const product of products) {
      await write(fileDesc, Buffer.from(JSON.stringify(product) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportProductModels(): Promise<any> {
  const methodName: string = 'exportProductModels';
  logger.info({ moduleName, methodName }, 'Starting...');

  let productModels: ProductModel[];
  try {
    productModels = await get(apiUrlProductModels());
    logger.debug({ moduleName, methodName, productModels });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (productModels !== null &&
      typeof productModels[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameProductModels);
    const fileDesc: number = await open(fileName, 'w');
    for (const productModel of productModels) {
      await write(fileDesc, Buffer.from(JSON.stringify(productModel) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

// TODO: export function exportPublishedProduct(): Promise<any>

// TODO: export function exportProductMediaFile(): Promise<any>

export async function exportReferenceEntities(): Promise<any> {
  const methodName: string = 'exportReferenceEntities';
  logger.info({ moduleName, methodName }, 'Starting...');

  try {
    await unlink(path.join(exportPath, filenameReferenceEntityAttributes));
  } catch (err) {
    if (err.code !== 'ENOENT') {
      logger.error({ moduleName, methodName, err });
    }
  }

  try {
    await unlink(path.join(exportPath, filenameReferenceEntityAttributeOptions));
  } catch (err) {
    if (err.code !== 'ENOENT') {
      logger.error({ moduleName, methodName, err });
    }
  }

  let referenceEntities: ReferenceEntity[];
  try {
    referenceEntities = await get(apiUrlReferenceEntities());
    logger.debug({ moduleName, methodName, referenceEntities });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (referenceEntities !== null &&
      typeof referenceEntities[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameReferenceEntities);
    const fileDesc: number = await open(fileName, 'w');
    for (const referenceEntity of referenceEntities) {
      await write(fileDesc, Buffer.from(JSON.stringify(referenceEntity) + '\n'));
      try {
        await exportReferenceEntityAttributes(referenceEntity.code);
      } catch (err) {
        logger.info({ moduleName, methodName, err });
        return err;
      }
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportReferenceEntityAttributes(referenceEntityCode: string): Promise<any> {
  const methodName: string = 'exportReferenceEntityAttributes';
  logger.info({ moduleName, methodName }, 'Starting...');

  let referenceEntityAttributes: ReferenceEntityAttribute[];
  try {
    referenceEntityAttributes = await get(apiUrlReferenceEntityAttributes(referenceEntityCode));
    logger.debug({ moduleName, methodName, referenceEntityAttributes });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  if (referenceEntityAttributes !== null &&
      typeof referenceEntityAttributes[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameReferenceEntityAttributes);
    const fileDesc: number = await open(fileName, 'a');
    for (const referenceEntityAttribute of referenceEntityAttributes) {
      if (!(referenceEntityAttribute.reference_entity_code)) {
        referenceEntityAttribute.reference_entity_code = referenceEntityCode;
      }
      await write(fileDesc, Buffer.from(JSON.stringify(referenceEntityAttribute) + '\n'));
      if (referenceEntityAttribute.type === 'multiple_options' ||
          referenceEntityAttribute.type === 'single_option') {
        try {
          await exportReferenceEntityAttributeOptions(referenceEntityCode, referenceEntityAttribute.code);
        } catch (err) {
          logger.info({ moduleName, methodName, err });
          return err;
        }
      }
    }
    await close(fileDesc);
  }
  return OK;
}

export async function exportReferenceEntityAttributeOptions(referenceEntityCode: string,
                                                            attributeCode: string): Promise<any> {
  const methodName: string = 'exportReferenceEntityAttributeOptions';
  logger.info({ moduleName, methodName }, 'Starting...');

  let referenceEntityAttributeOptions: ReferenceEntityAttributeOption[] = [];
  try {
    referenceEntityAttributeOptions = await get(apiUrlReferenceEntityAttributeOptions(referenceEntityCode,
                                                                                      attributeCode));
    logger.debug({ moduleName, methodName, referenceEntityAttributeOptions });
  } catch (err) {
    if (err.code && err.code !== 404) {
      logger.info({ moduleName, methodName, err });
      return err;
    }
  }
  if (referenceEntityAttributeOptions !== null &&
      typeof referenceEntityAttributeOptions[Symbol.iterator] === 'function') {
    const fileName: string = path.join(exportPath, filenameReferenceEntityAttributeOptions);
    const fileDesc: number = await open(fileName, 'a');
    for (const referenceEntityAttributeOption of referenceEntityAttributeOptions) {
      if (!(referenceEntityAttributeOption.reference_entity_code)) {
        referenceEntityAttributeOption.reference_entity_code = referenceEntityCode;
      }
      if (!(referenceEntityAttributeOption.attribute_code)) {
        referenceEntityAttributeOption.attribute_code = attributeCode;
      }
      await write(fileDesc, Buffer.from(JSON.stringify(referenceEntityAttributeOption) + '\n'));
    }
    await close(fileDesc);
  }
  return OK;
}

// TODO: export function exportReferenceEntityMediaFile(): Promise<any>

// TODO: PAM

// A main method with no command line parameter management
async function main(): Promise<any> {
  const methodName: string = 'main';
  logger.info({ moduleName, methodName }, `Starting...`);
/*
  await exportChannels();

  await exportLocales();

  await exportCurrencies();

  await exportMeasureFamilies();

  await exportAttributes();

  await exportAttributeGroups();

  await exportAssociationTypes();

  await exportCategories();

  await exportFamilies();

  await exportProducts();

  await exportProductModels();

  await exportReferenceEntities();

  await importAssociationTypes();

  await importChannels();

  await importAttributes();

  await importAttributeOptions();

  await importAttributeGroups();

  await importFamilies();
*/
  await importFamilyVariants();
/*
  await importCategories();
*/
  if (require.main === module) {
    setTimeout(() => { process.exit(0); }, 10000);
  }

  logger.info({ moduleName, methodName }, `Ending.`);
}

// Start the program
if (require.main === module) {
  main();
}
