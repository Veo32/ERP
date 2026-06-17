import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const account = await prisma.organizationAccount.upsert({
    where: { id: "seed-account" },
    update: { name: "مجموعة المستقبل التجارية" },
    create: {
      id: "seed-account",
      name: "مجموعة المستقبل التجارية"
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      name: "مدير النظام",
      defaultLocale: "AR",
      theme: "SYSTEM"
    },
    create: {
      accountId: account.id,
      email: "admin@example.com",
      name: "مدير النظام",
      passwordHash: "replace-with-real-auth-provider",
      defaultLocale: "AR",
      theme: "SYSTEM"
    }
  });

  const operator = await prisma.user.upsert({
    where: { email: "warehouse@example.com" },
    update: { name: "مسؤول المخزون" },
    create: {
      accountId: account.id,
      email: "warehouse@example.com",
      name: "مسؤول المخزون",
      passwordHash: "replace-with-real-auth-provider",
      defaultLocale: "AR",
      theme: "DARK"
    }
  });

  const company = await prisma.company.upsert({
    where: { id: "seed-company-main" },
    update: {
      name: "شركة المستقبل للإلكترونيات",
      timezone: "Asia/Jerusalem",
      defaultCurrency: "ILS"
    },
    create: {
      id: "seed-company-main",
      accountId: account.id,
      name: "شركة المستقبل للإلكترونيات",
      legalName: "شركة المستقبل للإلكترونيات المحدودة",
      countryCode: "IL",
      timezone: "Asia/Jerusalem",
      defaultCurrency: "ILS",
      defaultLanguage: "AR",
      fiscalYearStartMonth: 1,
      fiscalYearStartDay: 1
    }
  });

  const branchCompany = await prisma.company.upsert({
    where: { id: "seed-company-branch" },
    update: { name: "شركة المستقبل للأثاث" },
    create: {
      id: "seed-company-branch",
      accountId: account.id,
      name: "شركة المستقبل للأثاث",
      countryCode: "AE",
      timezone: "Asia/Dubai",
      defaultCurrency: "AED",
      defaultLanguage: "AR",
      fiscalYearStartMonth: 4,
      fiscalYearStartDay: 1
    }
  });

  const mainWarehouse = await prisma.warehouse.upsert({
    where: { companyId_code: { companyId: company.id, code: "WH-MAIN" } },
    update: { name: "المخزن الرئيسي", isDefault: true },
    create: {
      companyId: company.id,
      code: "WH-MAIN",
      name: "المخزن الرئيسي",
      address: "المنطقة الصناعية",
      isDefault: true
    }
  });

  const showroom = await prisma.warehouse.upsert({
    where: { companyId_code: { companyId: company.id, code: "SHOW" } },
    update: { name: "صالة العرض" },
    create: {
      companyId: company.id,
      code: "SHOW",
      name: "صالة العرض",
      address: "الفرع التجاري"
    }
  });

  await prisma.companyMember.upsert({
    where: { companyId_userId: { companyId: company.id, userId: admin.id } },
    update: { role: UserRole.ADMINISTRATOR },
    create: {
      companyId: company.id,
      userId: admin.id,
      role: UserRole.ADMINISTRATOR
    }
  });

  await prisma.companyMember.upsert({
    where: { companyId_userId: { companyId: company.id, userId: operator.id } },
    update: {
      role: UserRole.MANAGER,
      assignedWarehouseId: mainWarehouse.id
    },
    create: {
      companyId: company.id,
      userId: operator.id,
      role: UserRole.MANAGER,
      assignedWarehouseId: mainWarehouse.id
    }
  });

  await prisma.companyMember.upsert({
    where: { companyId_userId: { companyId: branchCompany.id, userId: admin.id } },
    update: { role: UserRole.ADMINISTRATOR },
    create: {
      companyId: branchCompany.id,
      userId: admin.id,
      role: UserRole.ADMINISTRATOR
    }
  });

  const pcs = await prisma.uom.upsert({
    where: { code: "PCS" },
    update: {},
    create: { code: "PCS", nameAr: "قطعة", nameEn: "Piece", precision: 0 }
  });

  const box = await prisma.uom.upsert({
    where: { code: "BOX12" },
    update: {},
    create: { code: "BOX12", nameAr: "صندوق 12", nameEn: "Box of 12", precision: 0 }
  });

  const set = await prisma.uom.upsert({
    where: { code: "SET" },
    update: {},
    create: { code: "SET", nameAr: "طقم", nameEn: "Set", precision: 0 }
  });

  const vat = await prisma.taxTemplate.upsert({
    where: { companyId_name: { companyId: company.id, name: "ضريبة القيمة المضافة 17%" } },
    update: { rate: "17.00" },
    create: {
      companyId: company.id,
      name: "ضريبة القيمة المضافة 17%",
      rate: "17.00"
    }
  });

  const electronics = await prisma.itemGroup.upsert({
    where: { companyId_slug: { companyId: company.id, slug: "electronics" } },
    update: {
      defaultWarehouseId: mainWarehouse.id,
      defaultTaxTemplateId: vat.id
    },
    create: {
      companyId: company.id,
      name: "إلكترونيات",
      slug: "electronics",
      description: "مجموعة رئيسية للأجهزة والملحقات",
      defaultWarehouseId: mainWarehouse.id,
      defaultTaxTemplateId: vat.id
    }
  });

  const localItems = await prisma.itemGroup.upsert({
    where: { companyId_slug: { companyId: company.id, slug: "local-electronics" } },
    update: { parentId: electronics.id },
    create: {
      companyId: company.id,
      parentId: electronics.id,
      name: "أصناف محلية",
      slug: "local-electronics",
      defaultWarehouseId: showroom.id,
      defaultTaxTemplateId: vat.id
    }
  });

  const screens = await prisma.itemGroup.upsert({
    where: { companyId_slug: { companyId: company.id, slug: "screens" } },
    update: { parentId: localItems.id },
    create: {
      companyId: company.id,
      parentId: localItems.id,
      name: "شاشات",
      slug: "screens",
      defaultWarehouseId: showroom.id,
      defaultTaxTemplateId: vat.id
    }
  });

  const tv = await prisma.item.upsert({
    where: { companyId_sku: { companyId: company.id, sku: "TV-55-QLED" } },
    update: { reorderLevel: "8", leadTimeDays: 14 },
    create: {
      companyId: company.id,
      groupId: screens.id,
      sku: "TV-55-QLED",
      nameAr: "شاشة QLED قياس 55 بوصة",
      nameEn: "55 inch QLED TV",
      description: "صنف قابل للبيع والشراء مع تتبع أرقام تسلسلية",
      maintainsStock: true,
      valuationMethod: "FIFO",
      canSell: true,
      canBuy: true,
      reorderLevel: "8",
      leadTimeDays: 14,
      barcode: "7290000000551",
      defaultWarehouseId: showroom.id,
      defaultPurchaseUomId: box.id,
      defaultSalesUomId: pcs.id,
      taxTemplateId: vat.id,
      requiresQualityInspection: "REQUIRED"
    }
  });

  const remote = await prisma.item.upsert({
    where: { companyId_sku: { companyId: company.id, sku: "ACC-REMOTE" } },
    update: { reorderLevel: "30" },
    create: {
      companyId: company.id,
      groupId: electronics.id,
      sku: "ACC-REMOTE",
      nameAr: "ريموت تحكم ذكي",
      nameEn: "Smart Remote",
      maintainsStock: true,
      valuationMethod: "MOVING_AVERAGE",
      canSell: true,
      canBuy: true,
      reorderLevel: "30",
      leadTimeDays: 7,
      barcode: "7290000000102",
      defaultWarehouseId: mainWarehouse.id,
      defaultPurchaseUomId: pcs.id,
      defaultSalesUomId: pcs.id,
      taxTemplateId: vat.id
    }
  });

  const install = await prisma.item.upsert({
    where: { companyId_sku: { companyId: company.id, sku: "SRV-INSTALL" } },
    update: { maintainsStock: false },
    create: {
      companyId: company.id,
      sku: "SRV-INSTALL",
      nameAr: "خدمة تركيب وتشغيل",
      nameEn: "Installation service",
      maintainsStock: false,
      valuationMethod: "MOVING_AVERAGE",
      canSell: true,
      canBuy: false,
      defaultSalesUomId: pcs.id,
      taxTemplateId: vat.id
    }
  });

  const bundleItem = await prisma.item.upsert({
    where: { companyId_sku: { companyId: company.id, sku: "BND-TV-STARTER" } },
    update: { maintainsStock: false },
    create: {
      companyId: company.id,
      groupId: screens.id,
      sku: "BND-TV-STARTER",
      nameAr: "باقة شاشة ذكية مع تركيب",
      nameEn: "Smart TV starter bundle",
      description: "منتج وهمي يخصم مكوناته في الخلفية عند البيع",
      maintainsStock: false,
      valuationMethod: "MOVING_AVERAGE",
      canSell: true,
      canBuy: false,
      defaultSalesUomId: set.id,
      taxTemplateId: vat.id
    }
  });

  await prisma.uomConversion.upsert({
    where: {
      itemId_fromUomId_toUomId: {
        itemId: tv.id,
        fromUomId: box.id,
        toUomId: pcs.id
      }
    },
    update: { factor: "12" },
    create: {
      itemId: tv.id,
      fromUomId: box.id,
      toUomId: pcs.id,
      factor: "12"
    }
  });

  const bundle = await prisma.productBundle.upsert({
    where: { itemId: bundleItem.id },
    update: { active: true, backgroundMode: true },
    create: {
      companyId: company.id,
      itemId: bundleItem.id,
      active: true,
      backgroundMode: true
    }
  });

  await prisma.productBundleComponent.upsert({
    where: {
      bundleId_componentItemId_uomId: {
        bundleId: bundle.id,
        componentItemId: tv.id,
        uomId: pcs.id
      }
    },
    update: { quantity: "1" },
    create: {
      bundleId: bundle.id,
      componentItemId: tv.id,
      uomId: pcs.id,
      quantity: "1"
    }
  });

  await prisma.productBundleComponent.upsert({
    where: {
      bundleId_componentItemId_uomId: {
        bundleId: bundle.id,
        componentItemId: install.id,
        uomId: pcs.id
      }
    },
    update: { quantity: "1" },
    create: {
      bundleId: bundle.id,
      componentItemId: install.id,
      uomId: pcs.id,
      quantity: "1"
    }
  });

  const retail = await prisma.priceList.upsert({
    where: { companyId_name: { companyId: company.id, name: "سعر البيع العام" } },
    update: { isDefault: true },
    create: {
      companyId: company.id,
      name: "سعر البيع العام",
      type: "SELLING",
      currency: "ILS",
      isDefault: true
    }
  });

  const purchasing = await prisma.priceList.upsert({
    where: { companyId_name: { companyId: company.id, name: "سعر الشراء" } },
    update: { isDefault: true },
    create: {
      companyId: company.id,
      name: "سعر الشراء",
      type: "BUYING",
      currency: "ILS",
      isDefault: true
    }
  });

  const vipCustomer = await prisma.customer.upsert({
    where: { companyId_code: { companyId: company.id, code: "CUST-VIP" } },
    update: { name: "عميل عقود الصيانة" },
    create: {
      companyId: company.id,
      code: "CUST-VIP",
      name: "عميل عقود الصيانة",
      email: "vip@example.com",
      priceNotes: "تطبيق تسعيرة حصرية تلقائياً عند إنشاء فاتورة"
    }
  });

  await prisma.itemPrice.deleteMany({
    where: {
      itemId: { in: [tv.id, remote.id, install.id, bundleItem.id] },
      priceListId: { in: [retail.id, purchasing.id] }
    }
  });

  await prisma.itemPrice.createMany({
    data: [
      { priceListId: retail.id, itemId: tv.id, uomId: pcs.id, rate: "2190.00" },
      { priceListId: purchasing.id, itemId: tv.id, uomId: box.id, rate: "18000.00" },
      { priceListId: retail.id, itemId: remote.id, uomId: pcs.id, rate: "90.00" },
      { priceListId: retail.id, itemId: install.id, uomId: pcs.id, rate: "180.00" },
      {
        priceListId: retail.id,
        itemId: bundleItem.id,
        uomId: set.id,
        rate: "2290.00",
        validFrom: new Date("2026-07-01"),
        validTo: new Date("2026-08-01")
      },
      {
        priceListId: retail.id,
        itemId: tv.id,
        uomId: pcs.id,
        customerId: vipCustomer.id,
        rate: "2050.00",
        validFrom: new Date("2026-06-01")
      }
    ]
  });

  await prisma.stockLedgerEntry.deleteMany({
    where: { companyId: company.id, sourceType: "SEED" }
  });

  await prisma.stockLedgerEntry.createMany({
    data: [
      {
        companyId: company.id,
        itemId: tv.id,
        warehouseId: showroom.id,
        uomId: pcs.id,
        quantityIn: "24",
        unitCost: "1600.00",
        valuationMethod: "FIFO",
        movementType: "PURCHASE",
        sourceType: "SEED",
        sourceId: "opening-tv"
      },
      {
        companyId: company.id,
        itemId: remote.id,
        warehouseId: mainWarehouse.id,
        uomId: pcs.id,
        quantityIn: "120",
        unitCost: "38.00",
        valuationMethod: "MOVING_AVERAGE",
        movementType: "PURCHASE",
        sourceType: "SEED",
        sourceId: "opening-remote"
      },
      {
        companyId: company.id,
        itemId: tv.id,
        warehouseId: showroom.id,
        uomId: pcs.id,
        quantityOut: "3",
        unitCost: "1600.00",
        valuationMethod: "FIFO",
        movementType: "SALE",
        sourceType: "SEED",
        sourceId: "sale-tv"
      }
    ]
  });

  await prisma.serialNumber.upsert({
    where: { companyId_serial: { companyId: company.id, serial: "TV55-2026-0001" } },
    update: { status: "AVAILABLE" },
    create: {
      companyId: company.id,
      itemId: tv.id,
      warehouseId: showroom.id,
      serial: "TV55-2026-0001",
      status: "AVAILABLE",
      warrantyEnd: new Date("2028-06-01")
    }
  });

  const inventoryRoot = await prisma.accountingAccount.upsert({
    where: { companyId_code: { companyId: company.id, code: "1300" } },
    update: { name: "المخزون" },
    create: {
      companyId: company.id,
      code: "1300",
      name: "المخزون",
      type: "ASSET"
    }
  });

  await prisma.accountingAccount.upsert({
    where: { companyId_code: { companyId: company.id, code: "1301" } },
    update: { parentId: inventoryRoot.id },
    create: {
      companyId: company.id,
      parentId: inventoryRoot.id,
      code: "1301",
      name: "مخزون الإلكترونيات",
      type: "ASSET"
    }
  });

  await prisma.activityLog.create({
    data: {
      companyId: company.id,
      userId: admin.id,
      documentType: "Item",
      documentId: tv.id,
      action: "CREATE_OR_UPDATE",
      afterSnapshot: {
        sku: tv.sku,
        maintainsStock: tv.maintainsStock,
        valuationMethod: tv.valuationMethod
      }
    }
  });

  await prisma.comment.create({
    data: {
      companyId: company.id,
      userId: operator.id,
      documentType: "Item",
      documentId: tv.id,
      body: "يرجى مراجعة حد إعادة الطلب قبل موسم العروض @مدير النظام",
      mentions: {
        create: {
          userId: admin.id
        }
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
