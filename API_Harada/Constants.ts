// /**
//  * CDS (Common Data Service) Connect Info
//  */
// export const CONST_CDS_PREFIX = 'cr1a4_';
// //export const CONST_CDS_SUB_PATH = '/api/data/v9.1';
// export const CONST_CDS_SUB_PATH = '/api/data/v9.2';
// //https://haradacorp.api.crm7.dynamics.com/api/data/v9.2/
// export const CONST_CDS_TENANT = '7ada4c0c-be2a-4604-8be0-d1cfe5975009';
// export const CONST_CDS_CLIENT_ID = '51c31565-62d6-4373-80ea-4fe465ab4b6f'; // APPLICATIONID
// export const CONST_CDS_CLIENT_SECRET = 'gZ.GmDAdUm_Kk5s_m.NU74t_9V00BVa~_-';
// export const CONST_CDS_AUTHORITY_URL = 'https://login.microsoftonline.com' + '/' + CONST_CDS_TENANT;
// //export const CONST_CDS_REDIRECT_URL = 'https://haradacorp.crm7.dynamics.com';
// export const CONST_CDS_REDIRECT_URL = 'https://haradacorp.api.crm7.dynamics.com';

//#region CDS (Common Data Service)
/**
 * CDS (Common Data Service) Connect Info
 */
export const CONST_CDS_PREFIX = 'cr164_';
export const CONST_CDS_SUB_PATH = '/api/data/v9.2';
export const CONST_CDS_TENANT = '734234fa-cb41-481f-9031-d56d23dda043';
export const CONST_CDS_CLIENT_ID = '953bfef9-fe8a-4d2b-adcf-44ee08070988'; // APPLICATION_ID
export const CONST_CDS_CLIENT_SECRET = 'AXBXn91VpatG-_rz7~5rj.O-.l7aP85-8V';
export const CONST_CDS_AUTHORITY_URL = 'https://login.microsoftonline.com' + '/' + CONST_CDS_TENANT;
export const CONST_CDS_REDIRECT_URL = 'https://sunsetmoment.crm7.dynamics.com';
//#endregion

//#region Azure Storage
/**
 * AzureStorage Connect Info
 */
export const CONST_azureStorageAccountName = 'haradacorp';
export const CONST_azureStorageAccountKey = 'GPv/PdmmCWd8mMH69sZdEvvXCTaaAPrWyzNXWSkWWSo3LWbBZSUEY0+yMcuvkaOVI06zjCxB04rQwzZGwj1uaQ==';
export const CONST_azureStorageRootURL = 'https://' + CONST_azureStorageAccountName + '.blob.core.windows.net/';

export const CONST_StorageContainer_usercontents = 'usercontents';
export const CONST_StorageContainer_thumbnails = 'thumbnails';
export const CONST_StorageContainer_temporaryData = 'TemporaryData';
export const CONST_StorageFolder_temp = 'temp';

//#endregion

//#region REST Admin API reference [Harada]

// Ref to: https://harada-corp-sunset-moment.myshopify.com/admin/apps/private/322094661786
export const CONST_Harada_API_Key = '199a514e6feba962b8300036469025b2';
export const CONST_Harada_Password = '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';


// Ref to: https://shopify.dev/api/admin-rest#top
export const CONST_Harada_Endpoints= 'https://harada-corp-sunset-moment.myshopify.com/admin/api/';

/**
 * Shopify API versioning
 * API versioning allows Shopify to continuously evolve the platform while offering third-party developers a predictable path for feature upgrades and deprecations.
 */ 
// 2021-07
// 2023-01
export const CONST_Harada_API_Version = '2023-01';

/**
 * 
 *  Admin REST API endpoints are organized by resource type. You’ll need to use different endpoints depending on your app’s requirements.
 *  All Admin REST API endpoints follow this pattern:
 *  https://{shop_id}.myshopify.com/admin/api/2021-10/{resource}.json
 */
export const CONST_Harada_Tables = {
    /**
        The Customer resource stores information about a shop's customers, such as their contact details, their order history, and whether they've agreed to receive email marketing.
        Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/customer#top
    */
    Customers: 'customers',

    /**
        The Customer Address resource represents addresses that a customer has added. Each customer can have multiple addresses associated with them.
        Ref to: https://shopify.dev/api/admin-rest/2022-04/resources/customer-address
    */
    CustomerAddress: 'addresses',

    /**
        You can use the PriceRule DiscountCode resource to create discount codes that enable specific discounts to be redeemed. Merchants can distribute discount codes to their customers using a variety of means, such as an email or URL, and customers can apply these codes at checkout.
        Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/discountcode#top
    */
    DiscountCode: 'discount_codes',

    /** 
        You can query the Checkout resource to return abandoned checkouts. A checkout is considered abandoned when a customer leaves the checkout after the first page without completing their purchase.
        Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/abandoned-checkouts#resource_object
    */
    AbandonedCheckouts: 'checkouts',

    /**
        An order is a customer's request to purchase one or more products from a shop. You can create, retrieve, update, and delete orders using the Order resource.
        Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/order
    */
    Order: 'orders',

    /**
        The Product resource lets you update and create products in a merchant's store. You can use product variants with the Product resource to create or update different versions of the same product. You can also add or update product images.

        You can add products to collections with the CustomCollection resource and the SmartCollection resource.

        Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/product#top
    */
    Product: 'products',

    /**
        The Country resource represents the tax rates applied to orders from the different countries where a shop sells its products.

        Merchants select the countries where they sell their products when they set up their shipping zones and rates on the Shipping page of the Shopify admin. After adding a country to a shipping zone, store owners can then verify and adjust tax rates for each country on the Taxes page.

        The Country resource lets you access the countries and tax rates set up by the merchant. The countries list includes a default entry called Rest of World, which represents all non-specified countries.

        You can use the Country resource to modify the sales tax rate for a country or sub-region to account for surtaxes or exemptions that apply to the store.

        For more information on managing tax rates for sub-regions of a country, such as states or provinces, see the Province resource.

        Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/country#top
    */
    Country: 'countries',

    /**
        You can use the ShippingZone resource to view shipping zones and their countries, provinces, and shipping rates. A shipping zone belongs to a delivery profile, which provides shops with the ability to create shipping rates per product variant and per location. For example, the merchant might want to use a shipping rate that applies only to fragile products. When querying the ShippingZone resource, each shipping zone is returned with its corresponding profile ID, location group ID, and countries. Its possible for the same country to exist in multiple shipping zones, if the shipping zones with overlapping countries have different delivery profiles.

        Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/shippingzone#top
    */
    ShippingZone: 'shipping_zones',

    /** 
        The Shop resource is a collection of general business and store management settings and information about the store. 
        The resource lets you retrieve information about the store, but it doesn't let you update any information. 
        Only the merchant can update this information from inside the Shopify admin.
      
        Ref to: https://shopify.dev/api/admin-rest/2022-04/resources/shop#top
    */
    Shop: 'shop',

    /**
        Merchants can use draft orders to create orders on behalf of their customers. Draft orders are useful for merchants that need to do the following tasks:
            + Create new orders for sales made by phone, in person, by chat, or elsewhere. When a merchant accepts payment for a draft order, an order is created.
            + Send invoices to customers to pay with a secure checkout link.
            + Use custom items to represent additional costs or products that aren't displayed in a shop's inventory.
            + Re-create orders manually from active sales channels.
            + Sell products at discount or wholesale rates.
            + Take pre-orders.
            + Save an order as a draft and resume working on it later.
        Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/draftorder
    */
    DraftOrders: 'draft_orders',

    /**
        Transactions are created for every order that results in an exchange of money.
        There are five types of transactions:
            + Authorization: An amount reserved against the cardholder's funding source. Money does not change hands until the authorization is captured.
            + Sale: An authorization and capture performed together in a single step.
            + Capture: A transfer of the money that was reserved during the authorization stage.
            + Void: A cancellation of a pending authorization or capture.
            + Refund: A partial or full return of captured funds to the cardholder. A refund can happen only after a capture is processed.
        Ref to: https://shopify.dev/api/admin-rest/2022-10/resources/transaction#top
    */
    Transaction: 'transactions',

    /**
        The Refund resource has two major components:
            1. Transaction records of money returned to the customer
            2. The line items included in the refund, along with restocking instructions

        Before you create a refund, use the calculate endpoint to generate accurate refund transactions. 
        Specify the line items that are being refunded, their quantity and restock instructions, 
        and whether you're refunding shipping costs. 
        You can then use the response of the calculate endpoint to create the actual refund.

        When you create a refund using the response from the calculate endpoint, you can set additional options, 
        such as whether to notify the customer of the refund. 
        You can refund less than the calculated amount for either shipping or the line items by setting a custom 
        value for the amount property.

        If a refund includes shipping costs, or if you choose to refund line items for less than their calculated amount, 
        then an order adjustment is created automatically to account for the discrepancy in the store's financial reports.
        Ref to: https://shopify.dev/api/admin-rest/2023-01/resources/refund
    */
    Refund: 'refunds',
};

export const CONST_Harada_Countries = [
    { key: 'IS', text: 'アイスランド', value: 'Iceland' },
    { key: 'IE', text: 'アイルランド', value: 'Ireland' },
    { key: 'AC', text: 'アセンション島', value: 'Ascension Island' },
    { key: 'AZ', text: 'アゼルバイジャン', value: 'Azerbaijan' },
    { key: 'AF', text: 'アフガニスタン', value: 'Afghanistan' },
    { key: 'US', text: 'アメリカ合衆国', value: 'United States' },
    { key: 'AE', text: 'アラブ首長国連邦', value: 'United Arab Emirates' },
    { key: 'DZ', text: 'アルジェリア', value: 'Algeria' },
    { key: 'AR', text: 'アルゼンチン', value: 'Argentina' },
    { key: 'AW', text: 'アルバ', value: 'Aruba' },
    { key: 'AL', text: 'アルバニア', value: 'Albania' },
    { key: 'AM', text: 'アルメニア', value: 'Armenia' },
    { key: 'AI', text: 'アンギラ', value: 'Anguilla' },
    { key: 'AO', text: 'アンゴラ', value: 'Angola' },
    { key: 'AG', text: 'アンティグア・バーブーダ', value: 'Antigua And Barbuda' },
    { key: 'AD', text: 'アンドラ', value: 'Andorra' },
    { key: 'YE', text: 'イエメン', value: 'Yemen' },
    { key: 'GB', text: 'イギリス', value: 'United Kingdom' },
    { key: 'IL', text: 'イスラエル', value: 'Israel' },
    { key: 'IT', text: 'イタリア', value: 'Italy' },
    { key: 'IQ', text: 'イラク', value: 'Iraq' },
    { key: 'IN', text: 'インド', value: 'India' },
    { key: 'ID', text: 'インドネシア', value: 'Indonesia' },
    { key: 'WF', text: 'ウォリス・フツナ', value: 'Wallis And Futuna' },
    { key: 'UG', text: 'ウガンダ', value: 'Uganda' },
    { key: 'UA', text: 'ウクライナ', value: 'Ukraine' },
    { key: 'UZ', text: 'ウズベキスタン', value: 'Uzbekistan' },
    { key: 'UY', text: 'ウルグアイ', value: 'Uruguay' },
    { key: 'EC', text: 'エクアドル', value: 'Ecuador' },
    { key: 'EG', text: 'エジプト', value: 'Egypt' },
    { key: 'EE', text: 'エストニア', value: 'Estonia' },
    { key: 'SZ', text: 'エスワティニ', value: 'Eswatini' },
    { key: 'ET', text: 'エチオピア', value: 'Ethiopia' },
    { key: 'ER', text: 'エリトリア', value: 'Eritrea' },
    { key: 'SV', text: 'エルサルバドル', value: 'El Salvador' },
    { key: 'OM', text: 'オマーン', value: 'Oman' },
    { key: 'NL', text: 'オランダ', value: 'Netherlands' },
    { key: 'BQ', text: 'オランダ領カリブ', value: 'Caribbean Netherlands' },
    { key: 'AU', text: 'オーストラリア', value: 'Australia' },
    { key: 'AT', text: 'オーストリア', value: 'Austria' },
    { key: 'AX', text: 'オーランド諸島', value: 'Aland Islands' },
    { key: 'KZ', text: 'カザフスタン', value: 'Kazakhstan' },
    { key: 'QA', text: 'カタール', value: 'Qatar' },
    { key: 'CA', text: 'カナダ', value: 'Canada' },
    { key: 'CM', text: 'カメルーン', value: 'Republic of Cameroon' },
    { key: 'KH', text: 'カンボジア', value: 'Cambodia' },
    { key: 'CV', text: 'カーボベルデ', value: 'Cape Verde' },
    { key: 'GY', text: 'ガイアナ', value: 'Guyana' },
    { key: 'GA', text: 'ガボン', value: 'Gabon' },
    { key: 'GM', text: 'ガンビア', value: 'Gambia' },
    { key: 'GH', text: 'ガーナ', value: 'Ghana' },
    { key: 'GG', text: 'ガーンジー', value: 'Guernsey' },
    { key: 'CY', text: 'キプロス', value: 'Cyprus' },
    { key: 'CW', text: 'キュラソー', value: 'Curaçao' },
    { key: 'KI', text: 'キリバス', value: 'Kiribati' },
    { key: 'KG', text: 'キルギス', value: 'Kyrgyzstan' },
    { key: 'GN', text: 'ギニア', value: 'Guinea' },
    { key: 'GW', text: 'ギニアビサウ', value: 'Guinea Bissau' },
    { key: 'GR', text: 'ギリシャ', value: 'Greece' },
    { key: 'KW', text: 'クウェート', value: 'Kuwait' },
    { key: 'CK', text: 'クック諸島', value: 'Cook Islands' },
    { key: 'CX', text: 'クリスマス島', value: 'Christmas Island' },
    { key: 'HR', text: 'クロアチア', value: 'Croatia' },
    { key: 'GT', text: 'グアテマラ', value: 'Guatemala' },
    { key: 'GP', text: 'グアドループ', value: 'Guadeloupe' },
    { key: 'GL', text: 'グリーンランド', value: 'Greenland' },
    { key: 'GD', text: 'グレナダ', value: 'Grenada' },
    { key: 'KY', text: 'ケイマン諸島', value: 'Cayman Islands' },
    { key: 'KE', text: 'ケニア', value: 'Kenya' },
    { key: 'CC', text: 'ココス(キーリング)諸島', value: 'Cocos (Keeling) Islands' },
    { key: 'CR', text: 'コスタリカ', value: 'Costa Rica' },
    { key: 'XK', text: 'コソボ', value: 'Kosovo' },
    { key: 'KM', text: 'コモロ', value: 'Comoros' },
    { key: 'CO', text: 'コロンビア', value: 'Colombia' },
    { key: 'CG', text: 'コンゴ共和国(ブラザビル)', value: 'Congo' },
    { key: 'CD', text: 'コンゴ民主共和国(キンシャサ)', value: 'Congo, The Democratic Republic Of The' },
    { key: 'CI', text: 'コートジボワール', value: 'Côte d&#39;Ivoire' },
    { key: 'SA', text: 'サウジアラビア', value: 'Saudi Arabia' },
    { key: 'GS', text: 'サウスジョージア・サウスサンドウィッチ諸島', value: 'South Georgia And The South Sandwich Islands' },
    { key: 'WS', text: 'サモア', value: 'Samoa' },
    { key: 'ST', text: 'サントメ・プリンシペ', value: 'Sao Tome And Principe' },
    { key: 'PM', text: 'サンピエール島・ミクロン島', value: 'Saint Pierre And Miquelon' },
    { key: 'SM', text: 'サンマリノ', value: 'San Marino' },
    { key: 'BL', text: 'サン・バルテルミー', value: 'Saint Barthélemy' },
    { key: 'MF', text: 'サン・マルタン', value: 'Saint Martin' },
    { key: 'ZM', text: 'ザンビア', value: 'Zambia' },
    { key: 'SL', text: 'シエラレオネ', value: 'Sierra Leone' },
    { key: 'SG', text: 'シンガポール', value: 'Singapore' },
    { key: 'SX', text: 'シント・マールテン', value: 'Sint Maarten' },
    { key: 'DJ', text: 'ジブチ', value: 'Djibouti' },
    { key: 'GI', text: 'ジブラルタル', value: 'Gibraltar' },
    { key: 'JM', text: 'ジャマイカ', value: 'Jamaica' },
    { key: 'JE', text: 'ジャージー', value: 'Jersey' },
    { key: 'GE', text: 'ジョージア', value: 'Georgia' },
    { key: 'ZW', text: 'ジンバブエ', value: 'Zimbabwe' },
    { key: 'CH', text: 'スイス', value: 'Switzerland' },
    { key: 'SE', text: 'スウェーデン', value: 'Sweden' },
    { key: 'SJ', text: 'スバールバル諸島・ヤンマイエン島', value: 'Svalbard And Jan Mayen' },
    { key: 'ES', text: 'スペイン', value: 'Spain' },
    { key: 'SR', text: 'スリナム', value: 'Suriname' },
    { key: 'LK', text: 'スリランカ', value: 'Sri Lanka' },
    { key: 'SK', text: 'スロバキア', value: 'Slovakia' },
    { key: 'SI', text: 'スロベニア', value: 'Slovenia' },
    { key: 'SD', text: 'スーダン', value: 'Sudan' },
    { key: 'SN', text: 'セネガル', value: 'Senegal' },
    { key: 'RS', text: 'セルビア', value: 'Serbia' },
    { key: 'KN', text: 'セントクリストファー・ネーヴィス', value: 'Saint Kitts And Nevis' },
    { key: 'VC', text: 'セントビンセント及びグレナディーン諸島', value: 'St. Vincent' },
    { key: 'SH', text: 'セントヘレナ', value: 'Saint Helena' },
    { key: 'LC', text: 'セントルシア', value: 'Saint Lucia' },
    { key: 'SC', text: 'セーシェル', value: 'Seychelles' },
    { key: 'SO', text: 'ソマリア', value: 'Somalia' },
    { key: 'SB', text: 'ソロモン諸島', value: 'Solomon Islands' },
    { key: 'TH', text: 'タイ', value: 'Thailand' },
    { key: 'TJ', text: 'タジキスタン', value: 'Tajikistan' },
    { key: 'TZ', text: 'タンザニア', value: 'Tanzania, United Republic Of' },
    { key: 'TC', text: 'タークス・カイコス諸島', value: 'Turks and Caicos Islands' },
    { key: 'CZ', text: 'チェコ', value: 'Czech Republic' },
    { key: 'TD', text: 'チャド', value: 'Chad' },
    { key: 'TN', text: 'チュニジア', value: 'Tunisia' },
    { key: 'CL', text: 'チリ', value: 'Chile' },
    { key: 'TV', text: 'ツバル', value: 'Tuvalu' },
    { key: 'DK', text: 'デンマーク', value: 'Denmark' },
    { key: 'TK', text: 'トケラウ', value: 'Tokelau' },
    { key: 'TA', text: 'トリスタン・ダ・クーニャ', value: 'Tristan da Cunha' },
    { key: 'TT', text: 'トリニダード・トバゴ', value: 'Trinidad and Tobago' },
    { key: 'TM', text: 'トルクメニスタン', value: 'Turkmenistan' },
    { key: 'TR', text: 'トルコ', value: 'Turkey' },
    { key: 'TO', text: 'トンガ', value: 'Tonga' },
    { key: 'TG', text: 'トーゴ', value: 'Togo' },
    { key: 'DE', text: 'ドイツ', value: 'Germany' },
    { key: 'DO', text: 'ドミニカ共和国', value: 'Dominican Republic' },
    { key: 'DM', text: 'ドミニカ国', value: 'Dominica' },
    { key: 'NG', text: 'ナイジェリア', value: 'Nigeria' },
    { key: 'NR', text: 'ナウル', value: 'Nauru' },
    { key: 'NA', text: 'ナミビア', value: 'Namibia' },
    { key: 'NU', text: 'ニウエ', value: 'Niue' },
    { key: 'NI', text: 'ニカラグア', value: 'Nicaragua' },
    { key: 'NE', text: 'ニジェール', value: 'Niger' },
    { key: 'NC', text: 'ニューカレドニア', value: 'New Caledonia' },
    { key: 'NZ', text: 'ニュージーランド', value: 'New Zealand' },
    { key: 'NP', text: 'ネパール', value: 'Nepal' },
    { key: 'NO', text: 'ノルウェー', value: 'Norway' },
    { key: 'NF', text: 'ノーフォーク島', value: 'Norfolk Island' },
    { key: 'HT', text: 'ハイチ', value: 'Haiti' },
    { key: 'HU', text: 'ハンガリー', value: 'Hungary' },
    { key: 'VA', text: 'バチカン市国', value: 'Holy See (Vatican City State)' },
    { key: 'VU', text: 'バヌアツ', value: 'Vanuatu' },
    { key: 'BS', text: 'バハマ', value: 'Bahamas' },
    { key: 'BM', text: 'バミューダ', value: 'Bermuda' },
    { key: 'BB', text: 'バルバドス', value: 'Barbados' },
    { key: 'BD', text: 'バングラデシュ', value: 'Bangladesh' },
    { key: 'BH', text: 'バーレーン', value: 'Bahrain' },
    { key: 'PK', text: 'パキスタン', value: 'Pakistan' },
    { key: 'PA', text: 'パナマ', value: 'Panama' },
    { key: 'PG', text: 'パプアニューギニア', value: 'Papua New Guinea' },
    { key: 'PY', text: 'パラグアイ', value: 'Paraguay' },
    { key: 'PS', text: 'パレスチナ自治区', value: 'Palestinian Territory, Occupied' },
    { key: 'PN', text: 'ピトケアン諸島', value: 'Pitcairn' },
    { key: 'FJ', text: 'フィジー', value: 'Fiji' },
    { key: 'PH', text: 'フィリピン', value: 'Philippines' },
    { key: 'FI', text: 'フィンランド', value: 'Finland' },
    { key: 'FO', text: 'フェロー諸島', value: 'Faroe Islands' },
    { key: 'FK', text: 'フォークランド諸島', value: 'Falkland Islands (Malvinas)' },
    { key: 'FR', text: 'フランス', value: 'France' },
    { key: 'BR', text: 'ブラジル', value: 'Brazil' },
    { key: 'BG', text: 'ブルガリア', value: 'Bulgaria' },
    { key: 'BF', text: 'ブルキナファソ', value: 'Burkina Faso' },
    { key: 'BN', text: 'ブルネイ', value: 'Brunei' },
    { key: 'BI', text: 'ブルンジ', value: 'Burundi' },
    { key: 'BT', text: 'ブータン', value: 'Bhutan' },
    { key: 'VN', text: 'ベトナム', value: 'Vietnam' },
    { key: 'BJ', text: 'ベナン', value: 'Benin' },
    { key: 'VE', text: 'ベネズエラ', value: 'Venezuela' },
    { key: 'BY', text: 'ベラルーシ', value: 'Belarus' },
    { key: 'BZ', text: 'ベリーズ', value: 'Belize' },
    { key: 'BE', text: 'ベルギー', value: 'Belgium' },
    { key: 'PE', text: 'ペルー', value: 'Peru' },
    { key: 'HN', text: 'ホンジュラス', value: 'Honduras' },
    { key: 'BA', text: 'ボスニア・ヘルツェゴビナ', value: 'Bosnia And Herzegovina' },
    { key: 'BW', text: 'ボツワナ', value: 'Botswana' },
    { key: 'BO', text: 'ボリビア', value: 'Bolivia' },
    { key: 'PT', text: 'ポルトガル', value: 'Portugal' },
    { key: 'PL', text: 'ポーランド', value: 'Poland' },
    { key: 'MG', text: 'マダガスカル', value: 'Madagascar' },
    { key: 'YT', text: 'マヨット', value: 'Mayotte' },
    { key: 'MW', text: 'マラウイ', value: 'Malawi' },
    { key: 'ML', text: 'マリ', value: 'Mali' },
    { key: 'MT', text: 'マルタ', value: 'Malta' },
    { key: 'MQ', text: 'マルティニーク', value: 'Martinique' },
    { key: 'MY', text: 'マレーシア', value: 'Malaysia' },
    { key: 'IM', text: 'マン島', value: 'Isle Of Man' },
    { key: 'MM', text: 'ミャンマー (ビルマ)', value: 'Myanmar' },
    { key: 'MX', text: 'メキシコ', value: 'Mexico' },
    { key: 'MZ', text: 'モザンビーク', value: 'Mozambique' },
    { key: 'MC', text: 'モナコ', value: 'Monaco' },
    { key: 'MV', text: 'モルディブ', value: 'Maldives' },
    { key: 'MD', text: 'モルドバ', value: 'Moldova, Republic of' },
    { key: 'MA', text: 'モロッコ', value: 'Morocco' },
    { key: 'MN', text: 'モンゴル', value: 'Mongolia' },
    { key: 'ME', text: 'モンテネグロ', value: 'Montenegro' },
    { key: 'MS', text: 'モントセラト', value: 'Montserrat' },
    { key: 'MU', text: 'モーリシャス', value: 'Mauritius' },
    { key: 'MR', text: 'モーリタニア', value: 'Mauritania' },
    { key: 'JO', text: 'ヨルダン', value: 'Jordan' },
    { key: 'LA', text: 'ラオス', value: 'Lao People&#39;s Democratic Republic' },
    { key: 'LV', text: 'ラトビア', value: 'Latvia' },
    { key: 'LT', text: 'リトアニア', value: 'Lithuania' },
    { key: 'LI', text: 'リヒテンシュタイン', value: 'Liechtenstein' },
    { key: 'LY', text: 'リビア', value: 'Libyan Arab Jamahiriya' },
    { key: 'LR', text: 'リベリア', value: 'Liberia' },
    { key: 'LU', text: 'ルクセンブルク', value: 'Luxembourg' },
    { key: 'RW', text: 'ルワンダ', value: 'Rwanda' },
    { key: 'RO', text: 'ルーマニア', value: 'Romania' },
    { key: 'LS', text: 'レソト', value: 'Lesotho' },
    { key: 'LB', text: 'レバノン', value: 'Lebanon' },
    { key: 'RE', text: 'レユニオン', value: 'Reunion' },
    { key: 'RU', text: 'ロシア', value: 'Russia' },
    { key: 'CN', text: '中国', value: 'China' },
    { key: 'CF', text: '中央アフリカ共和国', value: 'Central African Republic' },
    { key: 'MO', text: '中華人民共和国マカオ特別行政区', value: 'Macao' },
    { key: 'HK', text: '中華人民共和国香港特別行政区', value: 'Hong Kong' },
    { key: 'GF', text: '仏領ギアナ', value: 'French Guiana' },
    { key: 'PF', text: '仏領ポリネシア', value: 'French Polynesia' },
    { key: 'TF', text: '仏領極南諸島', value: 'French Southern Territories' },
    { key: 'MK', text: '北マケドニア', value: 'North Macedonia' },
    { key: 'ZA', text: '南アフリカ', value: 'South Africa' },
    { key: 'SS', text: '南スーダン', value: 'South Sudan' },
    { key: 'TW', text: '台湾', value: 'Taiwan' },
    { key: 'UM', text: '合衆国領有小離島', value: 'United States Minor Outlying Islands' },
    { key: 'JP', text: '日本', value: 'Japan' },
    { key: 'TL', text: '東ティモール', value: 'Timor Leste' },
    { key: 'IO', text: '英領インド洋地域', value: 'British Indian Ocean Territory' },
    { key: 'VG', text: '英領ヴァージン諸島', value: 'Virgin Islands, British' },
    { key: 'EH', text: '西サハラ', value: 'Western Sahara' },
    { key: 'GQ', text: '赤道ギニア', value: 'Equatorial Guinea' },
    { key: 'KR', text: '韓国', value: 'South Korea' }
];

export const CONST_Harada_Province_Of_JP = [
    { key: '', text: '都道府県', value: '' },
    { key: 'JP-01', text: '北海道', value: '["Hokkaidō","Hokkaido","Hokkaido Prefecture","北海道"]' },
    { key: 'JP-02', text: '青森県', value: '["Aomori","Aomori Prefecture","Aomori-ken","青森県","青森"]' },
    { key: 'JP-03', text: '岩手県', value: '["Iwate","Iwate Prefecture","Iwate-ken","岩手県","岩手"]' },
    { key: 'JP-04', text: '宮城県', value: '["Miyagi","Miyagi Prefecture","Miyagi-ken","宮城県","宮城"]' },
    { key: 'JP-05', text: '秋田県', value: '["Akita","Akita Prefecture","Akita-ken","秋田県","秋田"]' },
    { key: 'JP-06', text: '山形県', value: '["Yamagata","Yamagata Prefecture","Yamagata-ken","山形県","山形"]' },
    { key: 'JP-07', text: '福島県', value: '["Fukushima","Fukushima Prefecture","Fukushima-ken","福島県","福島"]' },
    { key: 'JP-08', text: '茨城県', value: '["Ibaraki","Ibaraki Prefecture","Ibaraki-ken","茨城県","茨城"]' },
    { key: 'JP-09', text: '栃木県', value: '["Tochigi","Tochigi Prefecture","Tochigi-ken","栃木県","栃木"]' },
    { key: 'JP-10', text: '群馬県', value: '["Gunma","Gunma Prefecture","Gunma-ken","群馬県","群馬"]' },
    { key: 'JP-11', text: '埼玉県', value: '["Saitama","Saitama Prefecture","Saitama-ken","埼玉県","埼玉"]' },
    { key: 'JP-12', text: '千葉県', value: '["Chiba","Chiba Prefecture","Chiba-ken","千葉県","千葉"]' },
    { key: 'JP-13', text: '東京都', value: '["Tōkyō","Tokyo","Tokyo Prefecture","Tōkyō-to","Tokyo-to","東京都","東京"]' },
    { key: 'JP-14', text: '神奈川県', value: '["Kanagawa","Kanagawa Prefecture","Kanagawa-ken","神奈川県","神奈川"]' },
    { key: 'JP-15', text: '新潟県', value: '["Niigata","Niigata Prefecture","Niigata-ken","新潟県","新潟"]' },
    { key: 'JP-16', text: '富山県', value: '["Toyama","Toyama Prefecture","Toyama-ken","富山県","富山"]' },
    { key: 'JP-17', text: '石川県', value: '["Ishikawa","Ishikawa Prefecture","Ishikawa-ken","石川県","石川"]' },
    { key: 'JP-18', text: '福井県', value: '["Fukui","Fukui Prefecture","Fukui-ken","福井県","福井"]' },
    { key: 'JP-19', text: '山梨県', value: '["Yamanashi","Yamanashi Prefecture","Yamanashi-ken","山梨県","山梨"]' },
    { key: 'JP-20', text: '長野県', value: '["Nagano","Nagano Prefecture","Nagano-ken","長野県","長野"]' },
    { key: 'JP-21', text: '岐阜県', value: '["Gifu","Gifu Prefecture","Gifu-ken","岐阜県","岐阜"]' },
    { key: 'JP-22', text: '静岡県', value: '["Shizuoka","Shizuoka Prefecture","Shizuoka-ken","静岡県","静岡"]' },
    { key: 'JP-23', text: '愛知県', value: '["Aichi","Aichi Prefecture","Aichi-ken","愛知県","愛知"]' },
    { key: 'JP-24', text: '三重県', value: '["Mie","Mie Prefecture","Mie-ken","三重県","三重"]' },
    { key: 'JP-25', text: '滋賀県', value: '["Shiga","Shiga Prefecture","Shiga-ken","滋賀県","滋賀"]' },
    { key: 'JP-26', text: '京都府', value: '["Kyōto","Kyoto","Kyoto Prefecture","Kyōto-fu","Kyoto-fu","京都府","京都"]' },
    { key: 'JP-27', text: '大阪府', value: '["Ōsaka","Osaka","Osaka Prefecture","Ōsaka-fu","Osaka-fu","大阪府","大阪"]' },
    { key: 'JP-28', text: '兵庫県', value: '["Hyōgo","Hyogo","Hyogo Prefecture","Hyōgo-ken","Hyogo-ken","兵庫県","兵庫"]' },
    { key: 'JP-29', text: '奈良県', value: '["Nara","Nara Prefecture","Nara-ken","奈良県","奈良"]' },
    { key: 'JP-30', text: '和歌山県', value: '["Wakayama","Wakayama Prefecture","Wakayama-ken","和歌山県","和歌山"]' },
    { key: 'JP-31', text: '鳥取県', value: '["Tottori","Tottori Prefecture","Tottori-ken","鳥取県","鳥取"]' },
    { key: 'JP-32', text: '島根県', value: '["Shimane","Shimane Prefecture","Shimane-ken","島根県","島根"]' },
    { key: 'JP-33', text: '岡山県', value: '["Okayama","Okayama Prefecture","Okayama-ken","岡山県","岡山"]' },
    { key: 'JP-34', text: '広島県', value: '["Hiroshima","Hiroshima Prefecture","Hiroshima-ken","広島県","広島"]' },
    { key: 'JP-35', text: '山口県', value: '["Yamaguchi","Yamaguchi Prefecture","Yamaguchi-ken","山口県","山口"]' },
    { key: 'JP-36', text: '徳島県', value: '["Tokushima","Tokushima Prefecture","Tokushima-ken","徳島県","徳島"]' },
    { key: 'JP-37', text: '香川県', value: '["Kagawa","Kagawa Prefecture","Kagawa-ken","香川県","香川"]' },
    { key: 'JP-38', text: '愛媛県', value: '["Ehime","Ehime Prefecture","Ehime-ken","愛媛県","愛媛"]' },
    { key: 'JP-39', text: '高知県', value: '["Kōchi","Kochi","Kochi Prefecture","Kōchi-ken","Kochi-ken","高知県","高知"]' },
    { key: 'JP-40', text: '福岡県', value: '["Fukuoka","Fukuoka Prefecture","Fukuoka-ken","福岡県","福岡"]' },
    { key: 'JP-41', text: '佐賀県', value: '["Saga","Saga Prefecture","Saga-ken","佐賀県","佐賀"]' },
    { key: 'JP-42', text: '長崎県', value: '["Nagasaki","Nagasaki Prefecture","Nagasaki-ken","長崎県","長崎"]' },
    { key: 'JP-43', text: '熊本県', value: '["Kumamoto","Kumamoto Prefecture","Kumamoto-ken","熊本県","熊本"]' },
    { key: 'JP-44', text: '大分県', value: '["Ōita","Oita","Oita Prefecture","Ōita-ken","Oita-ken","大分県","大分"]' },
    { key: 'JP-45', text: '宮崎県', value: '["Miyazaki","Miyazaki Prefecture","Miyazaki-ken","宮崎県","宮崎"]' },
    { key: 'JP-46', text: '鹿児島県', value: '["Kagoshima","Kagoshima Prefecture","Kagoshima-ken","鹿児島県","鹿児島"]' },
    { key: 'JP-47', text: '沖縄県', value: '["Okinawa","Okinawa Prefecture","Okinawa-ken","沖縄県","沖縄"]' },
];

//#region Stripe API
// https://stripe.com/docs/api
// https://stripe.com/docs/payments/payment-intents/migration/charges 
export const CONST_STRIPE_Endpoints = 'https://api.stripe.com';

// https://stripe.com/docs/api/authentication
export const CONST_STRIPE_API_Key = 'sk_test_51K56S1LbcxoSOdFH09kEGuMKCxkfIaE9RrJLjDsmK1XjJOuckiRzbY72EM4WRm1wEL1dTqiozR08PDypv8oArgLH00sl3cww8F';
export const CONST_STRIPE_API_Version = 'v1';
export const CONST_STRIPE_Tables = {
    /**
        This object represents a customer of your business. It lets you create recurring charges and track payments that belong to the same customer.
        Ref to: https://stripe.com/docs/api/customers
    */
    Customers: 'customers',

    /**
        Tokenization is the process Stripe uses to collect sensitive card or bank account details, or personally identifiable information (PII), 
        directly from your customers in a secure manner. A token representing this information is returned to your server to use. 
        You should use our recommended payments integrations to perform this process client-side. 
        This ensures that no sensitive card data touches your server, and allows your integration to operate in a PCI-compliant way.
        Ref to: https://stripe.com/docs/api/tokens
    */
    Tokens: 'tokens',

    /**
        To charge a credit or a debit card, you create a Charge object. You can retrieve and refund individual charges as well as list all charges. 
        Charges are identified by a unique, random ID.

        // https://stripe.com/docs/payments/payment-intents/migration/charges
        1. Used by businesses with customers primarily in the US / Canada who want a simple way to accept cards.
        2. Works on Web, iOS, and Android.
        3. Supports cards and all payment methods on the Sources API.
        4. Is not SCA ready

        Ref to: https://stripe.com/docs/api/charges
    */
    Charges: 'charges',

    /**
        PaymentMethod objects represent your customer's payment instruments. 
        You can use them with PaymentIntents to collect payments or save them to Customer objects to store instrument details for future payments.
        Ref to: https://stripe.com/docs/api/payment_methods
    */
    PaymentMethods: 'payment_methods',

    /**
        A PaymentIntent guides you through the process of collecting a payment from your customer. 
        We recommend that you create exactly one PaymentIntent for each order or customer session in your system. 
        You can reference the PaymentIntent later to see the history of payment attempts for a particular session.

        // https://stripe.com/docs/payments/payment-intents/migration/charges
        1. Required for businesses that accept multiple payment methods and cards requiring authentication (for example, due to Strong Customer Authentication in Europe).
        2. Works on Web, iOS, and Android. Can also be used to accept in-store payments with Terminal.
        3. Supports cards, cards requiring 3DS, iDEAL, SEPA, and many other payment methods.
        4. Is SCA ready

        Ref to: https://stripe.com/docs/api/payment_intents
    */
    PaymentIntents: 'payment_intents',

    /**
        Products describe the specific goods or services you offer to your customers. 
        For example, you might offer a Standard and Premium version of your goods or service; each version would be a separate Product. 
        They can be used in conjunction with Prices to configure pricing in Payment Links, Checkout, and Subscriptions.
        Ref to: https://stripe.com/docs/api/products
    */
    Products: 'products',


    /**
        Invoice Items represent the component lines of an invoice. An invoice item is added to an invoice by creating or updating it with an invoice field, 
        at which point it will be included as an invoice line item within invoice.lines.

        Invoice Items can be created before you are ready to actually send the invoice. This can be particularly useful when combined with a subscription. 
        Sometimes you want to add a charge or credit to a customer, but actually charge or credit the customer’s card only at the end of a regular billing cycle. 
        This is useful for combining several charges (to minimize per-transaction fees), or for having Stripe tabulate your usage-based billing totals.

        Ref to: https://stripe.com/docs/api/invoiceitems
    */
    InvoiceItems: 'invoiceitems',


    /**
        Products describe the specific goods or services you offer to your customers. 
        For example, you might offer a Standard and Premium version of your goods or service; each version would be a separate Product. 
        They can be used in conjunction with Prices to configure pricing in Payment Links, Checkout, and Subscriptions.
        Ref to: https://stripe.com/docs/api/invoices
    */
    Invoices: 'invoices',
   
};

//#endregion

// "admin_graphql_api_id": "gid://shopify/ProductVariant/39072856" -> 39072856(VariantId)
export const CONST_Gid_ProductVariant = 'gid://shopify/ProductVariant/'

/**
 *  All API queries return HTTP status codes that can tell you more about the response.
 *      Ref to: https://shopify.dev/api/admin-rest#status_and_error_codes
 */
export const CONST_Shopify_Status_And_Error_Codes = {
    /**
     *  Unauthorized
     *  The client doesn’t have correct authentication credentials.
     *  Ref to: HTTP/1.1 401 Unauthorized
     *          {
     *              "errors": "[API] Invalid API key or access token (unrecognized login or wrong password)"
     *          }
     */
    401: 'Unauthorized',

    /**
     *  Payment Required
     *  The shop is frozen. The shop owner will need to pay the outstanding balance to unfreeze the shop.
     *  Ref to: HTTP/1.1 402 Payment Required
     *          {
     *              "errors": "This shop's plan does not have access to this feature"
     *          }
     */
    402: 'Payment Required',

    /**
     *  Forbidden
     *  The server is refusing to respond. This is typically caused by incorrect access scopes.
     *  Ref to: HTTP/1.1 403 Access Denied
     *          {
     *              "errors": "User does not have access"
     *          }
     */
    403: 'Forbidden',

    /**
     *  Not Found
     *  The requested resource was not found but could be available again in the future.
     *  Ref to: HTTP/1.1 404 Not Found
     *          {
     *              "errors": "Not Found"
     *          }
     */
    404: 'Not Found',

    /**
     *  Unprocessable Entity
     *  The request body contains semantic errors. This is typically caused by incorrect formatting, omitting required fields, 
     *   or logical errors such as initiating a checkout for an out-of-stock product.
     *  Ref to: HTTP/1.1 422 Unprocessable Entity
     *          {
     *              "errors": "The fulfillment order is not in an open state."
     *          }
     */
    422: 'Unprocessable Entity',
    
    /**
     *  Too Many Requests
     *  The client has exceeded the rate limit.
     *  Ref to: HTTP/1.1 429 Too Many Requests
     *          {
     *              "errors": "Exceeded 2 calls per second for api client. Reduce request rates to resume uninterrupted service."
     *          }
     */
    429: 'Too Many Requests',

    /**
     *  5xx - Errors
     *  An internal error occurred in Shopify. Check out the Shopify status page for more information.
     *  Ref to: HTTP/1.1 500 Internal Server Error
     *          {
     *              "errors": "An unexpected error occurred"
     *          }
     */
    500: 'Errors',
};

//#endregion

/**
 * cloudconvert.com Connect Info
 */
export const CONST_cloudconvert_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTI3YWQxYzk4YjZlNGQzMTBjOGYyZjc5N2IzMWM2MWRkOTE3NTQ1ODM2OWQ3MGFkNmVkNWJmZGUzNTM3MGYwOGI5NjUxNDVhZTlkNmNiZTYiLCJpYXQiOjE2MjIxOTY2NDQuMzE2OTQ1LCJuYmYiOjE2MjIxOTY2NDQuMzE2OTQ5LCJleHAiOjQ3Nzc4NzAyNDQuMjc2ODgxLCJzdWIiOiI1MTM5MDUyOCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Wx_iS_wzV23UGXYJ9k0T_RkLjApfdoHReHSNlbOzX5ovokBh_tppah_rHkuYQWlFSaRWH5Mc3pfKK-mKvQwl3OaRxI4aBIHRwe_CJTWvfuM9KSA-3S4b3LkbsgbIPFviYuMjqmNgKJXsADEFgXoypf_xdA1ALUdOjljGe0PdIhB42_-BHWo9NOZoGJd-bhidwWflM5XpzUJxhcZDV8BK1G5yWjunKvt63H0vMpTF2UnPcyEOxYWaFAAp0y47YOh0QhLDwhL_jwbupmxOuyECfWkNOjN37cH3iaUnuaxoH9xSEUF3N0Pkt-GL1wQU-4RiVXpo7NiGZbhPupNuknEXeyHSMiW_PGoNaxCoh83fQrsFjC3oUVWUd916sPipvKf35h3-Qcq2jCLmE6RvCK3bQO-AYx5bveQG0U0LXGGF9gF0-N88rbvAOOr6mov9byvvX2pxbOv18o9NrG7AbxAxd-_kPhXytY5XtvrQ_RnGi94CllYVN0GUC5XSE68oDTvkvaAp7TUSdilKkPJvFyiMmkP3bL_KskZn4Y-LkuHoWwd1rfVFLpm-JLZFAjHWqDqqj27KEgA4I7Uks4mnnD5W6NIqTGiFv2SGC-yjU3F9DWrPjnBcv6PoIlaeTyOSzYLxfrEQQJex1cb7EQ97O3bBoWcs2tuvjXjP9zis_4nletA';

/**
 * Link Order History of harada on Shopify
 */
export const ORDER_HISTORY_PAGE = 'https://harada-corp-sunset-moment.myshopify.com/pages/order-history';

export const CONST_azureTableName = {
    product_master: 'product_master',
    classification_master: 'classification_master',
    user_management: 'user_management',
    user_design_product_management: 'user_design_product_management',
    order_management: 'order_management',

    // ---- 2022.05.26 -> For Repeat purchase
    customer: 'customer',
    order: 'order',
    order_details: 'order_details',
    temp_design: 'temp_design'
};

export const CONST_azureAction = {
    test_data: 'test_data',
    get_total_qty: 'get_total_qty',
    output_pattern: 'output_pattern'
};

//#region SENDGRID_EMAIL
/**
 * Mail Service for the SendGrid
 */
 export const SENDGRID_EMAIL = {
    /**
      * 
      * Mail Service for the SendGrid v3 Web API
      * Ref to: https://www.npmjs.com/package/@sendgrid/mail
      */
    PACKAGE: 'PACKAGE',

    /**
     * How to send an email with Dynamic Transactional Templates
     * Ref to: https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates
     */
    API: 'API',
}

export const EMAIL_FOR_DEV = 'ngoctrong@systemgear-vietnam.com';

// Dev SGVN: ntngoctrong@gmail.com

// Dev Harada: sunset-moment-dev@haradacorp.co.jp
// For: Single Sender Verification
// export const SENDGRID_FROM_EMAIL = 'sunset-moment-dev@haradacorp.co.jp';

// For: Domain Authentication
export const SENDGRID_FROM_EMAIL = 'sunset-moment-dev@sunset-moment.com';

// Dev SGVN: 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
// 2022.09.16 For dev Sunset Moment(sunset-moment-dev@haradacorp.co.jp)
// Dev Harada: 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
export const SENDGRID_API_KEY = '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';

//#endregion

/**
 * Option Key Size For Kid
 */
export const OptionKeySizeForKid = {
    /**
      * SS
      */
    SS: '100',

    /**
     * S
     */
    S: '110',

    /**
     * M
     */
    M: '120',

    /**
     * L
     */
    L: '130',

    /**
     * LL
     */
    LL: '140',
}

//#region OPERATION_UI
/**
 * Status on O_UI
 */
export const OPERATION_UI_STATUS = {
    /**
      * 承認待ち：デザイン承認待ち
      * 〇 Waiting for approval: Waiting for design approval
      */
    1: '承認待ち',

    //#region For 差し戻し
    /**
     * 差し戻し→ユ：運営からユーザーへデザイン差し戻し
     * 〇 Remand → Yu: Design remand from operation to user
     */
    2: '差し戻し→ユ',
    /**
     * 差し戻し→運：工場から運営へデザイン差し戻し
     * 〇 Remand → Luck: Design remand from factory to operation
     */
    3: '差し戻し→運',
    //#endregion

    /**
     * 印刷待ち：デザイン承認済み、印刷開始待ち
     * 〇 Waiting for print: Design approved, waiting for printing to start
     */
    4: '印刷待ち',

    /**
     * 印刷中：印刷開始済み
     * 〇 Printing: Printing has started
     */
    5: '印刷中',
}

/**
 * Status on O_UI
 */
export const OPERATION_UI_STATUS_EN_PRO = {
    /**
     * 承認待ち：デザイン承認待ち
     *  〇 Waiting for approval: Waiting for design approval
     */
    1: 'Pending approval',

    //#region For 差し戻し
    /**
     * 差し戻し→ユ：運営からユーザーへデザイン差し戻し
     *  〇 Remand → Yu: Design remand from operation to user
     */
    2: 'Remand→User',
    /**
     * 差し戻し→運：工場から運営へデザイン差し戻し
     *  〇 Remand → Luck: Design remand from factory to operation
     *   → [2023.03.10] (３）工場（Plant）は承認作業をしないことになりました。)
     *     (Don't use)
     */
    3: 'Remand→Ope',
    //#endregion

    /**
     * 印刷待ち：デザイン承認済み、印刷開始待ち
     *  〇 Waiting for print: Design approved, waiting for printing to start
     */
    // 4: 'Pending approval',
    // (Flow B)
    //  --運営承認：運営デザイン承認済み、工場承認待ち
    //  * 〇 Operational Approval: Operational design approved, pending factory approval
    4: 'Operational approval',

    /**
     * 印刷中：印刷開始済み
     *  〇 Printing: Printing has started
     */
    5: 'Printing',

    /**
     * 出荷済み
     *  〇 Shipped:
     */
    6: 'Shipped',

    /**
     * 2023.03.10
     * 支払い待ち
     *  〇 Waiting for payment
     */
    // * 工場承認：工場デザイン承認済み、印刷（ユーザー決済）待ち
    // * 〇 Factory approval: Factory design approved, waiting for printing (user payment)
    7: 'Factory approval',
}

/**
 * Status on O_UI
 */
export const OPERATION_UI_STATUS_ORDER_DETAILS_EN_PRO = {
    /**
      * 承認待ち：デザイン承認待ち
      * 〇 Waiting for approval: Waiting for design approval
      */
    1:'Pending approval',

    //#region For 差し戻し
    /**
     * 差し戻し→ユ：運営からユーザーへデザイン差し戻し
     * 〇 Remand → Yu: Design remand from operation to user
     */
    2: 'Remand',
    /**
     * 差し戻し→運：工場から運営へデザイン差し戻し
     * 〇 Remand → Luck: Design remand from factory to operation
     */
    3: 'Remand',
    //#endregion

    /**
     * 印刷待ち：デザイン承認済み、印刷開始待ち
     * 〇 Waiting for print: Design approved, waiting for printing to start
     */
    // 4: 'Waiting for print',
    // (Flow B)
    // --運営承認：運営デザイン承認済み、工場承認待ち
    // * Operational Approval: Operational design approved, pending factory approval
    4: 'Operational approval',

    /**
     * 印刷中：印刷開始済み
     *  〇 Printing: Printing has started
     */
    5: 'Printing',

    /**
     * 出荷済み
     *  〇 Shipped: 
     */
    6: 'Shipped',

    /**
     * 工場承認：工場デザイン承認済み、印刷（ユーザー決済）待ち
     * Factory approval: Factory design approved, waiting for printing (user payment)
     */
     7: 'Factory approval',
}

/**
 * Status on O_UI
 */
 export const OPERATION_UI_STATUS_EN = {
    /**
     * 承認待ち：デザイン承認待ち
     *  〇 Waiting for approval: Waiting for design approval
     */
    1: 'Waiting for approval',

    //#region For 差し戻し
    /**
     * 差し戻し→ユ：運営からユーザーへデザイン差し戻し
     *  〇 Remand → Yu: Design remand from operation to user
     */
    2: 'Remand→User',
    /**
     * 差し戻し→運：工場から運営へデザイン差し戻し
     *  〇 Remand → Luck: Design remand from factory to operation
     *   → [2023.03.10] (３）工場（Plant）は承認作業をしないことになりました。)
     *     (Don't use)
     */
    3: 'Remand→Ope',
    //#endregion

    /**
     * 印刷待ち：デザイン承認済み、印刷開始待ち
     *  〇 Waiting for print: Design approved, waiting for printing to start
     */
    4: 'Waiting for print',

    /**
     * 印刷中：印刷開始済み
     *  〇 Printing: Printing has started
     */
    5: 'Printing',

    /**
     * 出荷済み
     *  〇 Shipped:
     */
    6: 'Shipped',

    /**
     * 2023.03.10
     * 支払い待ち
     *  〇 Waiting for payment
     */
    7: 'Waiting for payment',
}

/**
 * Status on O_UI
 */
export const OPERATION_UI_STATUS_ORDER_DETAILS_EN = {
    /**
      * 承認待ち：デザイン承認待ち
      * 〇 Waiting for approval: Waiting for design approval
      */
    1:'Waiting for approval',

    //#region For 差し戻し
    /**
     * 差し戻し→ユ：運営からユーザーへデザイン差し戻し
     * 〇 Remand → Yu: Design remand from operation to user
     */
    2: 'Remand',
    /**
     * 差し戻し→運：工場から運営へデザイン差し戻し
     * 〇 Remand → Luck: Design remand from factory to operation
     */
    3: 'Remand',
    //#endregion

    /**
     * 印刷待ち：デザイン承認済み、印刷開始待ち
     * 〇 Waiting for print: Design approved, waiting for printing to start
     */
    // 4: 'Waiting for print',
    4: 'Waiting for print',

    /**
     * 印刷中：印刷開始済み
     *  〇 Printing: Printing has started
     */
    5: 'Printing',

    /**
     * 出荷済み
     *  〇 Shipped: 
     */
    6: 'Shipped',

    /**
     * 2023.03.10
     * 支払い待ち
     *  〇 Waiting for payment
     */
    7: 'Waiting for payment',
}

/**
 * Status Key on O_UI
 */
 export const OPERATION_UI_STATUS_KEY = {
    /**
     * 承認待ち：デザイン承認待ち
     *  〇 Waiting for approval: Waiting for design approval
     */
    WAITING_APPROVAL: '1',

    //#region For 差し戻し
    /**
     * 差し戻し→ユ：運営からユーザーへデザイン差し戻し
     *  〇 Remand → Yu: Design remand from operation to user
     */
    REMAND_USER: '2',
    /**
     * 差し戻し→運：工場から運営へデザイン差し戻し
     *  〇 Remand → Luck: Design remand from factory to operation
     */
    REMAND_FACTORY: '3',
    //#endregion

    /**
     * 印刷待ち：デザイン承認済み、印刷開始待ち
     *  〇 Waiting for print: Design approved, waiting for printing to start
     */
    WAITING_PRINT: '4',

    /**
     * 印刷中：印刷開始済み
     *  〇 Printing: Printing has started
     */
    PRINTING: '5',

    /**
     * 出荷済み
     *  〇 Shipped: 
     */
    SHIPPED: '6',

    /**
     * 2023.03.10
     * 支払い待ち
     *  〇 Waiting for payment
     */
    WAITING_PAYMENT: '7',
}

/**
 * Type on O_UI
 */
 export const OPERATION_UI_TYPE = {
    //#region For 差し戻し
    /**
     * 差し戻し→ユ：運営からユーザーへデザイン差し戻し
     * 〇 Remand → Yu: Design remand from operation to user
     */
    USER: 'user',
    /**
     * 差し戻し→運：工場から運営へデザイン差し戻し
     * 〇 Remand → Luck: Design remand from factory to operation
     */
    FACTORY: 'factory',
    //#endregion
}
//#endregion

/**
 * Item type on O_UI
 */
export const OPERATION_UI_ITEM_TYPE = {
    POLO: 'ポロシャツ',
    SHIRTS: 'アロハシャツ',
    OPEN_COLLAR_SHIRT: "オープンカラーシャツ"
}

export const OPERATION_UI_ITEM_TYPE_EN = {
    POLO: 'Polo shirt',
    SHIRTS: 'Aloha shirt'
}

export const PowerApps_TableName = {
    customer: CONST_CDS_PREFIX + 'customers',
    order: CONST_CDS_PREFIX + 'orders',
    order_details: CONST_CDS_PREFIX + 'order_details',
    temp_design: CONST_CDS_PREFIX + 'temp_designs'
};

export const PowerApps_TableName_Dev = {
    customer: CONST_CDS_PREFIX + 'customerdevs',
    order: CONST_CDS_PREFIX + 'orderdevs',
    order_details: CONST_CDS_PREFIX + 'order_detaildevs',
    temp_design: CONST_CDS_PREFIX + 'temp_designdevs'
};

export const NOTE_RE_ORDER = "Re-order";


//#region Comment for Output Pattern
/**
 * ============================================================
 *      
 * ============================================================
 */

export const CONST_ColorTransparent = 'rgba(0, 0, 0, 0)';

export const CONST_PRODUCT_ID = {
    POLO: '6815975407770',
    SHIRTS: '6897685037210',
    HOODIE: '7547022901402'
};

export const NAME_FILE_SVG = {
    POLO: ['back', 'front', 'sleeveLeft', 'sleeveRight', 'collarStand_1', 'collarStand_2', 'collar_1', 'collar_2', 'placket_1', 'placket_2', 'pocket'],
    SHIRTS: ['back', 'frontLeft', 'frontRight', 'sleeveLeft', 'sleeveRight', 'collar_1', 'collar_2', 'pocket'],
    HOODIE: ['back', 'back_neck_tape', 'front', 'hood_inside_left', 'hood_inside_right', 'hood_left', 'hood_right', 'pocket_left_back', 'pocket_left_front', 'pocket_right_back', 'pocket_right_front', 'sleeve_left', 'sleeve_right']
}

export const CONST_OptionKeyStyle_key = {
    C1: 'C1',
    C2: 'C2',
    C3: 'C3',
    S1: 'S1',
    S2: 'S2',
}

export enum OptionKeySize {
    SS = "SS",
    S = "S",
    M = "M",
    L = "L",
    LL = "LL",
}
//#endregion


//#region ➝　PRODUCTION
/**
 * ============================================================
 *      Functions related to Output Pattern for Production
 * ============================================================
 */

export const INFO_ITEM_OUTPUT = {

    /*
    POLO: {
        MEN: {
            LL: [[1107.3050847457628, 1099.690082594162, 0.9271186440677966, 0.9271186440677966],
            [89.03389830508479, 1052.4036898333102, 0.9271186440677966, 0.9271186440677966],
            [640.5593220338983, 1454.028908315954, 0.9271186440677966, 0.9271186440677966],
            [1273.5593220338983, 1464.0277639087146, 0.9271186440677966, 0.9271186440677966],
            [62.71186440677968, 1381.4065842568934, 0.9271186440677966, 0.9271186440677966],
            [133.71186440677968, 1457.6819144144306, 0.9271186440677966, 0.9271186440677966],
            [65.06779661016947, 1272.5778710577042, 0.9271186440677966, 0.9271186440677966],
            [79.06779661016947, 1155.6240288163613, 0.9271186440677966, 0.9271186440677966],
            [887.2203389830509, 310.27749971802893, 0.9271186440677966, 0.9271186440677966],
            [994.2203389830509, 309.27521090355003, 0.9271186440677966, 0.9271186440677966],
            [918, 509.6831945988001, 0.9271186440677966, 0.9271186440677966]],

            L: [[1103.3140479074625, 1097.5242594103595, 0.9945989426536995, 0.9945989426536995],
            [11.787568486393639, 1051.5285815910415, 0.9945989426536995, 0.9945989426536995],
            [654.4999999999987, 1336.8376397895754, 0.9469324426308815, 0.9469324426308815],
            [41.03819974546957, 1385.9029088666732, 0.9945989426536995, 0.9945989426536995],
            [437.9566061405493, 1404.7736553655272, 0.9945989426536995, 0.9945989426536995],
            [1176.9566061405492, 1365.900453414975, 0.9945989426536995, 0.9945989426536995],
            [1271.5, 1284.8626823396323, 0.9945989426536995, 0.9945989426536995],
            [1253.5, 1168.8442219837275, 0.9945989426536995, 0.9945989426536995],
            [805.1238900414079, 323.6481195722444, 0.9945989426536995, 0.9945989426536995],
            [1062.1498905279502, 322.38936892234017, 0.9945989426536995, 0.9945989426536995],
            [900.332821558166, 311.1240419238544, 0.9945989426536995, 0.9945989426536995]],

            M: [[1118.2392030224548, 1059.3132428431159, 0.9869179935459229, 0.9869179935459229],
            [6.453994404268769, 1011.4345012530418, 0.9869179935459229, 0.9869179935459229],
            [625.4806597975584, 1221.7203937138784, 0.9869179935459229, 0.9869179935459229],
            [76.47399271659165, 1329.033272164119, 0.9869179935459229, 0.9869179935459229],
            [540.751458754048, 1281.203531300755, 0.9869179935459229, 0.9869179935459229],
            [1217.751458754048, 1318.9434183721455, 0.9869179935459229, 0.9869179935459229],
            [1227.1046987811087, 1238.991156048138, 0.9869179935459229, 0.9869179935459229],
            [1225.1046987811087, 1125.0277599596286, 0.9869179935459229, 0.9869179935459229],
            [995.2468721395647, 321.2031618867742, 0.9869179935459229, 0.9869179935459229],
            [1091.279052969429, 321.2044350663043, 0.9869179935459229, 0.9869179935459229],
            [810.5927252371484, 306.4523700691942, 0.9869179935459229, 0.9869179935459229]],

            S: [[1132.477640050573, 1020.5167886304989, 0.9590826128692175, 0.9590826128692175],
            [8.486233230521748, 971.5190175783756, 0.9590826128692175, 0.9590826128692175],
            [92.57468603159259, 1275.5182837264056, 0.9590826128692175, 0.9590826128692175],
            [654.5607962795787, 937.526501533183, 0.9590826128692175, 0.9590826128692175],
            [591.6059267996901, 1212.7563189976881, 0.9590826128692175, 0.9590826128692175],
            [1232.6059267996902, 1170.7568394115413, 0.9590826128692175, 0.9590826128692175],
            [666.9543775637325, 1054.8669393816463, 0.9590826128692175, 0.9590826128692175],
            [1272.9543775637326, 1087.8665180942417, 0.9590826128692175, 0.9590826128692175],
            [1041.012559166447, 531.0602190339832, 0.9590826128692175, 0.9590826128692175],
            [1036.0142526546965, 318.06288305727793, 0.9590826128692175, 0.9590826128692175],
            [797.0856089270359, 304.7029229224495, 0.9590826128692175, 0.9590826128692175]],

            SS: [[1154.2302270783703, 1012.542936341895, 1.004170742225449, 1.004170742225449],
            [-47.621433064547034, 960.549814234217, 1.004170742225449, 1.004170742225449],
            [649.30150710033, 759.9513545015624, 1.004170742225449, 1.004170742225449],
            [672.2870617582353, 454.0004609907165, 1.004170742225449, 1.004170742225449],
            [578.5017326676027, 1067.36662993012, 1.004170742225449, 1.004170742225449],
            [1222.1423201962943, 1059.6743598871244, 1.004170742225449, 1.004170742225449],
            [32.98150097852272, 1017.9021331433057, 1.004170742225449, 1.004170742225449],
            [601.9815009785233, 985.4266845895381, 1.004170742225449, 1.004170742225449],
            [658.7743871553054, 866.3932069263599, 1.004170742225449, 1.004170742225449],
            [1193.5658497062173, 865.393688291687, 1.004170742225449, 1.004170742225449],
            [755.1847137573668, 893.4084375398445, 1.004170742225449, 1.004170742225449]],
        },

        LADIES: {
            LL: [[1218.1525423728813, 1001.351302583565, 0.9271186440677966, 0.9271186440677966],
            [55.881355932203405, 952.6755051601414, 0.9271186440677966, 0.9271186440677966],
            [746.7627118644068, 974.8332150867154, 0.9271186440677966, 0.9271186440677966],
            [725.457627118644, 484.32160609263053, 0.9271186440677966, 0.9271186440677966],
            [667.1016949152543, 1117.044879356682, 0.9271186440677966, 0.9271186440677966],
            [656.1016949152543, 1047.373205386963, 0.9271186440677966, 0.9271186440677966],
            [1307.457627118644, 1095.7909364496788, 0.9271186440677966, 0.9271186440677966],
            [69.76271186440681, 1047.1110155725498, 0.9271186440677966, 0.9271186440677966],
            [1051.915254237288, 681.1908860448519, 0.9271186440677966, 0.9271186440677966],
            [1149.915254237288, 577.2291217064786, 0.9271186440677966, 0.9271186440677966],
            [746.3050847457628, 641.68578520343, 0.9271186440677966, 0.9271186440677966]],

            L: [[1234.562245464412, 991.9855975259553, 0.9513043478260866, 0.9513043478260866],
            [34.29757158039632, 948.9824051812485, 0.9513043478260866, 0.9513043478260866],
            [764.6197970250024, 774.9886753552756, 0.9513043478260866, 0.9513043478260866],
            [761.6247973357273, 409.99111505595585, 0.9513043478260866, 0.9513043478260866],
            [628.0669361122533, 1054.9846050324186, 0.9513043478260866, 0.9513043478260866],
            [1257.4452981530096, 1053.9843605036413, 0.9513043478260866, 0.9513043478260866],
            [50.83200720201717, 1033.9838238120642, 0.9513043478260866, 0.9513043478260866],
            [624.825934540217, 980.4206662567558, 0.9513043478260866, 0.9513043478260866],
            [702.5688258858983, 828.2993955490347, 0.9513043478260866, 0.9513043478260866],
            [800.5741063562022, 887.9866430260709, 0.9513043478260866, 0.9513043478260866],
            [696, 468.9930932920992, 0.9513043478260866, 0.9513043478260866]],

            M: [[1249.1118347476433, 973.1801764260103, 0.9602466875756287, 0.9602466875756287],
            [12.986965645045416, 932.2457971025981, 0.9602466875756287, 0.9602466875756287],
            [798.8973265407108, 400.66791897043606, 0.9602466875756287, 0.9602466875756287],
            [825.9051048018384, 673.4328876180573, 0.9602466875756287, 0.9602466875756287],
            [33.00000000000023, 983.178424284519, 0.9602466875756287, 0.9602466875756287],
            [655.0000000000002, 964.1943203523339, 0.9602466875756287, 0.9602466875756287],
            [570.2537162290371, 887.257067988445, 0.9602466875756287, 0.9602466875756287],
            [598.2378409220285, 774.3524443953338, 0.9602466875756287, 0.9602466875756287],
            [653.5703709915298, 529.5599299120743, 0.9602466875756287, 0.9602466875756287],
            [680.576753263889, 314.7408683332575, 0.9602466875756287, 0.9602466875756287],
            [1188.6336042034031, 854.641067572553, 0.9602466875756287, 0.9602466875756287]],

            S: [[1261.12740627021, 961.3046016058836, 0.9920221537049054, 0.9920221537049054],
            [-16.305672212069226, 919.343752938508, 0.9920221537049054, 0.9920221537049054],
            [785.2305835955138, 395.3013470016905, 0.9920221537049054, 0.9920221537049054],
            [823.2400286268836, 659.5218449548014, 0.9920221537049054, 0.9920221537049054],
            [27.31976464709271, 958.2997509022927, 0.9920221537049054, 0.9920221537049054],
            [741.2695842986677, 921.3287401077246, 0.9920221537049054, 0.9920221537049054],
            [763.3355246624726, 848.9126593242373, 0.9920221537049054, 0.9920221537049054],
            [707.3203930684949, 734.4645988791931, 0.9920221537049054, 0.9920221537049054],
            [644.0000000000002, 313.7520099036468, 0.9920221537049054, 0.9920221537049054],
            [741.0000000000002, 311.7743171084024, 0.9920221537049054, 0.9920221537049054],
            [699.3141517072802, 516.6267833087173, 0.9920221537049054, 0.9920221537049054]],

            SS: [[-42.42187367616458, 951.2704889515136, 1.0380949297342945, 1.0380949297342945],
            [508.0091983208577, 911.6922308717824, 1.0380949297342945, 1.0380949297342945],
            [1055.2538863900702, 643.9556661717755, 1.0380949297342945, 1.0380949297342945],
            [1097.2494416694253, 386.69642998758525, 1.0380949297342945, 1.0380949297342945],
            [538.9797538464649, 942.2561752059079, 1.0380949297342945, 1.0380949297342945],
            [1126.9247674863823, 930.6042825982315, 1.0380949297342945, 1.0380949297342945],
            [1316.0000000000023, 852.4236031871923, 1.0380949297342945, 1.0380949297342945],
            [1314.0000000000018, 746.4076130055512, 1.0380949297342945, 1.0380949297342945],
            [1586.1745389608827, 320.47989881193735, 1.0380949297342945, 1.0380949297342945],
            [1684.221760692415, 319.90644585045027, 1.0380949297342945, 1.0380949297342945],
            [1743.2782497938556, 512.8747826265462, 1.0380949297342945, 1.0380949297342945]],
        },

        KID: {
            //140
            LL: [[1340.5084745762713, 836.0947204837285, 0.9271186440677966, 0.9271186440677966],
            [64.45762711864404, 801.8185787809157, 0.9271186440677966, 0.9271186440677966],
            [861.1864406779662, 603.7375830772528, 0.9271186440677966, 0.9271186440677966],
            [799.1864406779662, 355.59457937201046, 0.9271186440677966, 0.9271186440677966],
            [61.49152542372883, 866.6888105069482, 0.9271186440677966, 0.9271186440677966],
            [632.4915254237288, 832.4075233742778, 0.9271186440677966, 0.9271186440677966],
            [825.9322033898305, 768.629755555744, 0.9271186440677966, 0.9271186440677966],
            [826.6271186440678, 678.682496211786, 0.9271186440677966, 0.9271186440677966],
            [623.4745762711865, 276.98986297022606, 0.9271186440677966, 0.9271186440677966],
            [711.5593220338983, 265.99307886388726, 0.9271186440677966, 0.9271186440677966],
            [626.2542372881358, 451.3463208601881, 0.9271186440677966, 0.9271186440677966]],

            //130
            L: [[1334.5218277695888, 783.7232774359672, 1, 1],
            [795.4807601952446, 759.0705511780541, 1, 1],
            [307.13727815918367, 583.0992154009215, 1, 1],
            [357.130611078217, 348.11627300269384, 1, 1],
            [38.00000000000023, 778.6223552103331, 1, 1],
            [36.00000000000023, 722.6874228969656, 1, 1],
            [595.0000000000005, 808.0706907192902, 1, 1],
            [296.00000000000045, 655.2450079715339, 1, 1],
            [281.3612031708882, 287.0307607484651, 1, 1],
            [197.18260863800816, 275.33960231321345, 1, 1],
            [52.21030138043399, 267.50543631155307, 1, 1]],

            //120
            M: [[1320.665212500335, 764.5573435221393, 1.0631148759734803, 1.0631148759734803],
            [806.4348493564539, 754.1652723162035, 1.0631148759734803, 1.0631148759734803],
            [7.001195974296422, 336.1663916545149, 1.0631148759734803, 1.0631148759734803],
            [382.99730684373316, 515.9217365417148, 1.0631148759734803, 1.0631148759734803],
            [-1.7760671322634494, 756.1453400832269, 1.0631148759734803, 1.0631148759734803],
            [543.2944294362873, 767.1323474690698, 1.0631148759734803, 1.0631148759734803],
            [318.4999999999999, 688.074342427358, 1.0631148759734803, 1.0631148759734803],
            [6.500000000000284, 599.3241684187824, 1.0631148759734803, 1.0631148759734803],
            [504.34458678251934, 292.6686567040691, 1.0631148759734803, 1.0631148759734803],
            [593.1870206372045, 291.67281255054183, 1.0631148759734803, 1.0631148759734803],
            [41.09490000938237, 473.28807541264234, 1.0631148759734803, 1.0631148759734803]],

            //110
            S: [[1359.5312649135285, 736.2806473882484, 0.9970687951186153, 0.9970687951186153],
            [868.9243083601311, 716.301060592886, 0.9970687951186153, 0.9970687951186153],
            [41.789089213906664, 321.21863289126134, 0.9970687951186153, 0.9970687951186153],
            [467.7907559841485, 320.6759830921783, 0.9970687951186153, 0.9970687951186153],
            [380.69787802504743, 627.3675129491064, 0.9970687951186153, 0.9970687951186153],
            [58.739504023559334, 459.54039557492473, 0.9970687951186153, 0.9970687951186153],
            [410.0000000000007, 563.4017536993042, 0.9970687951186153, 0.9970687951186153],
            [88.00000000000045, 393.60619899738384, 0.9970687951186153, 0.9970687951186153],
            [836.3573508070718, 477.5212872946698, 0.9970687951186153, 0.9970687951186153],
            [751.5682410235045, 489.8164563863177, 0.9970687951186153, 0.9970687951186153],
            [611.6572476536684, 478.6215256311991, 0.9970687951186153, 0.9970687951186153]],

            //100
            SS: [[1361.3088808414254, 712.872026143628, 1.019331676670684, 1.019331676670684],
            [891.675570667909, 695.690801633641, 1.019331676670684, 1.019331676670684],
            [92.56179280691248, 302.8650331438324, 1.019331676670684, 1.019331676670684],
            [507.56957106804043, 302.8696077278649, 1.019331676670684, 1.019331676670684],
            [408.91376160469684, 611.7411781830735, 1.019331676670684, 1.019331676670684],
            [102.97465985340051, 439.81218430601797, 1.019331676670684, 1.019331676670684],
            [438.5000000000007, 547.5380425580814, 1.019331676670684, 1.019331676670684],
            [124.83333206176826, 374.61375721264517, 1.019331676670684, 1.019331676670684],
            [874.4646907162851, 464.804860038934, 1.019331676670684, 1.019331676670684],
            [788.0167349379735, 473.79187437382234, 1.019331676670684, 1.019331676670684],
            [649.1155895890716, 464.79994452343175, 1.019331676670684, 1.019331676670684]],
        }
    },

    SHIRTS: {
        MEN: {
            LL: [[522.678344415861, 1165.998890696827, 0.9529616724738676, 0.9529616724738676],
            [1286.0575486940388, 1803.432370232326, 0.9529616724738676, 0.9529616724738676],
            [9.758703375711661, 1803.432370232326, 0.9529616724738676, 0.9529616724738676],
            [619.046463067051, 1997.0039762851743, 0.9529616724738676, 0.9529616724738676],
            [584.7980683771661, 1584.0326795047745, 0.9529616724738676, 0.9529616724738676],
            [9.019876637449414, 1948.6251914809677, 0.9529616724738676, 0.9529616724738676],
            [1284.5582272043725, 1966.6239638037218, 0.9529616724738676, 0.9529616724738676],
            [165.82380247556932, 422.99968219456406, 0.9529616724738676, 0.9529616724738676]],

            L: [[536.2559071532305, 1147.6636771866522, 0.9634150731851181, 0.9634150731851181],
            [1305.466563796448, 1733.8718761144632, 0.9634150731851181, 0.9634150731851181],
            [-14.816157514253803, 1104.059445825087, 0.9634150731851181, 0.9634150731851181],
            [686.8923364793831, 1540.7390561414206, 0.9634150731851181, 0.9634150731851181],
            [-3.115992201529224, 1494.5144398588889, 0.9634150731851181, 0.9634150731851181],
            [26.644615997039864, 1675.8044040581653, 0.9634150731851181, 0.9634150731851181],
            [627.2269723688718, 1675.803918704233, 0.9634150731851181, 0.9634150731851181],
            [1505.000269532303, 533.7984571238748, 0.9634150731851181, 0.9634150731851181]],

            M: [[498.09524135562674, 1128.378147737829, 0.9637557960332351, 0.9637557960332351],
            [1323.8927779373744, 1094.8102770371765, 0.9637557960332351, 0.9637557960332351],
            [-32.11055523710189, 1094.8102770371765, 0.9637557960332351, 0.9637557960332351],
            [1248.4894603486302, 1453.7536695088565, 0.9637557960332351, 0.9637557960332351],
            [-17.64788974979865, 1498.7408298865137, 0.9637557960332351, 0.9637557960332351],
            [814.2864812325689, 1474.7535458034374, 0.9637557960332351, 0.9637557960332351],
            [691.2864812325689, 1246.7917570498914, 0.9637557960332351, 0.9637557960332351],
            [645.7630662020906, 1493.7507091606876, 0.9637557960332351, 0.9637557960332351]],

            S: [[501, 1074.3133617122312, 0.8759797358234079, 0.8759797358234079],
            [1350, 1053.4777028477058, 0.899270312764109, 0.899270312764109],
            [-17, 1049.7134506386828, 0.899270312764109, 0.899270312764109],
            [1297, 1420.8614976239896, 0.8942210709086563, 0.8942210709086563],
            [9, 1421.6055222191378, 0.8942210709086563, 0.8942210709086563],
            [786, 1409.618290043215, 0.956407940055981, 0.956407940055981],
            [726, 1218.6681098669214, 0.956407940055981, 0.956407940055981],
            [622.0000000000041, 1454.5949732003671, 0.9506600935828659, 0.9506600935828659]],

            //new
            SS: [[584.7777189501685, 1080.114374732745, 0.9744298411102414, 0.9744298411102414],
            [1359.9369748646354, 1043.4087662086172, 0.9744298411102414, 0.9744298411102414],
            [-76.06854308957253, 1043.4087662086172, 0.9744298411102414, 0.9744298411102414],
            [-42.4134341016636, 1389.9388185028365, 0.9744298411102414, 0.9744298411102414],
            [1262.5487872473468, 1394.92884598402, 0.9744298411102414, 0.9744298411102414],
            [718.6489519729305, 1193.1154712101822, 0.9744298411102414, 0.9744298411102414],
            [716.6489441902024, 1336.0376749386928, 0.9744298411102414, 0.9744298411102414],
            [537.5000050365928, 947.5229267850866, 0.9744298411102414, 0.9744298411102414]],
        },

        LADIES: {
            LL: [[557.0383275261324, 1008.4079560789972, 0.9529616724738676, 0.9529616724738676],
            [1312.178571447198, 1521.0698094140296, 0.9529616724738676, 0.9529616724738676],
            [8.428571428571445, 956.1164962843711, 0.9529616724738676, 0.9529616724738676],
            [1374.588850174216, 660.2444889144725, 0.9529616724738676, 0.9529616724738676],
            [827.5888501742161, 1383.1851883984598, 0.9529616724738676, 0.9529616724738676],
            [132.05574912891984, 1122.3604937581033, 0.9529616724738676, 0.9529616724738676],
            [129.31358885017426, 1278.8626585802501, 0.9529616724738676, 0.9529616724738676],
            [733.7595818815331, 1488.891679839771, 0.9529616724738676, 0.9529616724738676]],

            L: [[512.5082088140408, 995.4068704464215, 0.9699622222855379, 0.9699622222855379],
            [1325.257481848958, 964.8673971266289, 0.9699622222855379, 0.9699622222855379],
            [-12.742498272893442, 964.8673971266289, 0.9699622222855379, 0.9699622222855379],
            [-6.695594913059892, 1298.324316157184, 0.9699622222855379, 0.9699622222855379],
            [1384.2935074378154, 1296.3253556707884, 0.9699622222855379, 0.9699622222855379],
            [802.9771365181527, 1125.8475469454222, 0.9699622222855379, 0.9699622222855379],
            [793.9408364299784, 1265.828371315899, 0.9699622222855379, 0.9699622222855379],
            [559.4999999999975, 1231.8331312239366, 0.9699622222855379, 0.9699622222855379]],

            M: [[482.09446166262273, 972.1083473568503, 0.95311566698168, 0.95311566698168],
            [1344.7373889979922, 944.2001109587665, 0.95311566698168, 0.95311566698168],
            [-22.26259113876023, 944.2001109587665, 0.95311566698168, 0.95311566698168],
            [-15.960453917844973, 1257.1714915036366, 0.95311566698168, 0.95311566698168],
            [1403.0071811620114, 1257.1728082574657, 0.95311566698168, 0.95311566698168],
            [837.4999999999994, 1097.279077278543, 0.95311566698168, 0.95311566698168],
            [831.4999999999994, 1238.1836126259298, 0.95311566698168, 0.95311566698168],
            [530.944441638042, 1203.6907447629626, 0.95311566698168, 0.95311566698168]],

            S: [[455.94870027489543, 950.0700128608308, 0.9536771075403067, 0.9536771075403067],
            [1353.4480038119377, 937.5175397509225, 0.9536771075403067, 0.9536771075403067],
            [-30.55197596718739, 937.5175397509225, 0.9536771075403067, 0.9536771075403067],
            [-29.330227411633643, 1224.4904448670088, 0.9536771075403067, 0.9536771075403067],
            [1414.628655084458, 1224.49270950792, 0.9536771075403067, 0.9536771075403067],
            [866, 1062.5641656416565, 0.9536771075403067, 0.9536771075403067],
            [857, 1205.5649856498565, 0.9536771075403067, 0.9536771075403067],
            [526.463659090733, 1154.1414940154464, 0.9536771075403067, 0.9536771075403067]],

            SS: [[632.4782896311337, 929.0593707493207, 0.9818649999999951, 0.9818649999999951],
            [1371.628004953458, 905.2285684005759, 0.9818649999999951, 0.9818649999999951],
            [-63.60750269335324, 905.2285684005759, 0.9818649999999951, 0.9818649999999951],
            [1403.2367994042525, 1193.8555252038382, 0.9818649999999951, 0.9818649999999951],
            [-32.82492331460338, 1194.8524577141372, 0.9818649999999951, 0.9818649999999951],
            [888.7437653675232, 1043.8752810590256, 0.9818649999999951, 0.9818649999999951],
            [887.7113015447461, 1183.8601017871936, 0.9818649999999951, 0.9818649999999951],
            [602.5000000000008, 1144.4787090078364, 0.9818649999999951, 0.9818649999999951]],
        },

        KID: {
            //140
            LL: [[784.0452961672474, 898.9600923170483, 0.9529616724738676, 0.9529616724738676],
            [1428.7247386759582, 866.5937037595156, 0.9529616724738676, 0.9529616724738676],
            [351.7247386759582, 866.5937037595156, 0.9529616724738676, 0.9529616724738676],
            [1435.3379790940767, 1131.1324965902586, 0.9529616724738676, 0.9529616724738676],
            [8.337979094076672, 1118.4018912801496, 0.9529616724738676, 0.9529616724738676],
            [485.79790940766554, 996.1882813791115, 0.9529616724738676, 0.9529616724738676],
            [483.79790940766554, 1130.1882813791115, 0.9529616724738676, 0.9529616724738676],
            [94.69686411149826, 721.8770679406085, 0.9529616724738676, 0.9529616724738676]],

            //130
            L: [[823.7503381801978, 863.9195458873286, 0.9531920431528258, 0.9531920431528258],
            [1440.6415858615787, 838.9901009077522, 0.9531920431528258, 0.9531920431528258],
            [419.0416102756408, 991.9371870444318, 0.9531920431528258, 0.9531920431528258],
            [1.9611322329818393, 976.9382011789312, 0.9531920431528258, 0.9531920431528258],
            [1.9611322329818393, 352.97781580782134, 0.9531920431528258, 0.9531920431528258],
            [1418.9999999999989, 975.9384547125713, 0.9531920431528258, 0.9531920431528258],
            [931.9999999999989, 979.9375673448842, 0.9531920431528258, 0.9531920431528258],
            [143.69116663674706, 684.339417787669, 0.9531920431528258, 0.9531920431528258]],

            //120
            M: [[387.42452821254994, 833.8788051874535, 0.9366435385132015, 0.9366435385132015],
            [986.6000061035153, 813.3961601255406, 0.9366435385132015, 0.9366435385132015],
            [-4.399993896484602, 813.3961601255406, 0.9366435385132015, 0.9366435385132015],
            [1459.827659518347, 346.11956840377127, 0.9366435385132015, 0.9366435385132015],
            [1459.796535665044, 580.9046987015529, 0.9366435385132015, 0.9366435385132015],
            [1392.9442950604716, 907.178643351837, 0.9366435385132015, 0.9366435385132015],
            [870.942075075814, 915.1595420344379, 0.9366435385132015, 0.9366435385132015],
            [1747.0000000000018, 758.3123525736312, 0.8757442408703265, 0.8757442408703265]],

            //110
            S: [[447.8894369679149, 795.0797526414741, 0.9666183820637266, 0.9666183820637266],
            [1044.6941565467184, 779.7524229390261, 0.9666183820637266, 0.9666183820637266],
            [64.69415653181647, 779.7524229390261, 0.9666183820637266, 0.9666183820637266],
            [1457.8542013470744, 335.39563217852935, 0.9666183820637266, 0.9666183820637266],
            [1457.7971537525852, 546.7266933463143, 0.9666183820637266, 0.9666183820637266],
            [1424.500000000001, 663.0052709766363, 0.9666183820637266, 0.9666183820637266],
            [1424.500000000001, 793.6991782258517, 0.9666183820637266, 0.9666183820637266],
            [-3.13322940241882, 764.1579267488875, 0.9666183820637266, 0.9666183820637266]],

            //100
            SS: [[337.26946710603283, 758.973810239941, 0.964117017627794, 0.964117017627794],
            [921.5875892358866, 743.1941616504228, 0.964117017627794, 0.964117017627794],
            [-34.41241076411393, 743.1941616504228, 0.964117017627794, 0.964117017627794],
            [1469.6211047346887, 321.8264397071749, 0.964117017627794, 0.964117017627794],
            [1460.5564992797804, 523.1565238536289, 0.964117017627794, 0.964117017627794],
            [1435.0000000000005, 624.0765671981782, 0.964117017627794, 0.964117017627794],
            [1426.7614077163003, 754.5515059578397, 0.964117017627794, 0.964117017627794],
            [1345.0903190480415, 291.7023595017197, 0.964117017627794, 0.964117017627794]],
        }
    },
    */

    // Change from 2023.01.12
    POLO: {
        MEN: {
            LL: [[290.30508474576277, 1098.6912270014013, 0.9271186440677966, 0.9271186440677966],
            [1116.0338983050847, 1052.4052157096291, 0.9271186440677966, 0.9271186440677966],
            [693.5593220338983, 1463.0266195014751, 0.9271186440677966, 0.9271186440677966],
            [62.5593220338983, 1462.0277639087149, 0.9271186440677966, 0.9271186440677966],
            [1244.7118644067796, 1468.3737779160297, 0.9271186440677966, 0.9271186440677966],
            [1244.7118644067796, 1394.7063284355386, 0.9271186440677966, 0.9271186440677966],
            [1297.0677966101694, 1288.5736748978263, 0.9271186440677966, 0.9271186440677966],
            [1298.0677966101694, 1170.618306780164, 0.9271186440677966, 0.9271186440677966],
            [99.22033898305085, 310.27826265618853, 0.9271186440677966, 0.9271186440677966],
            [198.22033898305085, 308.2763553107894, 0.9271186440677966, 0.9271186440677966],
            [135, 508.68395753695984, 0.9271186440677966, 0.9271186440677966]],

            L: [[1104.3140479074625, 1095.528890877873, 0.9945989426536995, 0.9945989426536995],
            [357.78756848639364, 1046.5305665056903, 0.9945989426536995, 0.9945989426536995],
            [633.4999999999986, 1424.7774307118991, 0.9945989426536995, 0.9945989426536995],
            [1245.0381997454697, 1426.875120061592, 0.9945989426536995, 0.9945989426536995],
            [21.956606140549297, 1162.933110175637, 0.9945989426536995, 0.9945989426536995],
            [31.956606140549184, 1088.085712115517, 0.9945989426536995, 0.9945989426536995],
            [27.5, 1276.8659905307136, 0.9945989426536995, 0.9945989426536995],
            [31.5, 1400.6913835557798, 0.9945989426536995, 0.9945989426536995],
            [213.1238900414079, 321.64811957224435, 0.9945989426536995, 0.9945989426536995],
            [313.123890041408, 322.38936892234017, 0.9945989426536995, 0.9945989426536995],
            [247.33282155816596, 519.98642117488, 0.9945989426536995, 0.9945989426536995]],

            M: [[-3.7607969775451693, 1336.1781842482087, 0.9869179935459229, 0.9869179935459229],
            [1131.4539944042688, 1008.4374161867449, 0.9869179935459229, 0.9869179935459229],
            [1248.4806597975585, 1326.6698681963592, 0.9869179935459229, 0.9869179935459229],
            [679.4806597975585, 1326.6698681963592, 0.9869179935459229, 0.9869179935459229],
            [26.75145875404803, 257.7019849639736, 0.9869179935459229, 0.9869179935459229],
            [26.7514587540479, 183.49676995343785, 0.9869179935459229, 0.9869179935459229],
            [27.10469878110871, 372.41382143507775, 0.9869179935459229, 0.9869179935459229],
            [584.1046987811087, 378.41382143507775, 0.9869179935459229, 0.9869179935459229],
            [842.2468721395649, 575.0797630266793, 0.9869179935459229, 0.9869179935459229],
            [941.2790529694289, 575.0797630266793, 0.9869179935459229, 0.9869179935459229],
            [1038.5927252371484, 573.3231413416931, 0.9869179935459229, 0.9869179935459229]],

            S: [[1155.477640050573, 1020.5168629753349, 0.9590826128692175, 0.9590826128692175],
            [-6.513766769478252, 969.5190795324057, 0.9590826128692175, 0.9590826128692175],
            [83.57468603159259, 1277.5182465539874, 0.9590826128692175, 0.9590826128692175],
            [647.5607962795787, 1279.5223382223596, 0.9590826128692175, 0.9590826128692175],
            [1250.6059267996902, 1146.7571367908856, 0.9590826128692175, 0.9590826128692175],
            [1251.6059267996902, 1072.7580537105314, 0.9590826128692175, 0.9590826128692175],
            [687.9543775637325, 867.8692812439845, 0.9590826128692175, 0.9590826128692175],
            [671.9543775637326, 754.870644232647, 0.9590826128692175, 0.9590826128692175],
            [1039.012559166447, 317.062932620502, 0.9590826128692175, 0.9590826128692175],
            [1137.0142526546965, 316.06296979292006, 0.9590826128692175, 0.9590826128692175],
            [876.0856089270359, 304.7029972672856, 0.9590826128692175, 0.9590826128692175]],

            SS: [[1117.2302270783703, 1005.5498441029678, 1.004170742225449, 1.004170742225449],
            [-24.621433064547034, 959.5538776230834, 1.004170742225449, 1.004170742225449],
            [62.301507100330014, 1251.7502167526795, 1.004170742225449, 1.004170742225449],
            [613.2870617582353, 1257.6753898814113, 1.004170742225449, 1.004170742225449],
            [1179.5017326676027, 1154.3296530914367, 1.004170742225449, 1.004170742225449],
            [606.1423201962943, 743.8039819919599, 1.004170742225449, 1.004170742225449],
            [651.9815009785227, 857.9675537040534, 1.004170742225449, 1.004170742225449],
            [1236.9815009785234, 1088.384831684215, 1.004170742225449, 1.004170742225449],
            [937.7743871553054, 322.61669331400714, 1.004170742225449, 1.004170742225449],
            [1065.5658497062173, 321.61392396824124, 1.004170742225449, 1.004170742225449],
            [749.1847137573668, 308.648177482957, 1.004170742225449, 1.004170742225449]],
        },

        LADIES: {
            LL: [[1198.1525423728813, 1002.3509288495889, 0.9271186440677966, 0.9271186440677966],
            [81.8813559322034, 953.6751314261653, 0.9271186440677966, 0.9271186440677966],
            [716.7627118644068, 1246.78220039897, 0.9271186440677966, 0.9271186440677966],
            [196.45762711864404, 1246.1792134477153, 0.9271186440677966, 0.9271186440677966],
            [1196.1016949152543, 1153.0383390120992, 0.9271186440677966, 0.9271186440677966],
            [1243.1016949152543, 1076.3677862443087, 0.9271186440677966, 0.9271186440677966],
            [689.457627118644, 917.8240119065689, 0.9271186440677966, 0.9271186440677966],
            [673.7627118644068, 810.1554899157123, 0.9271186440677966, 0.9271186440677966],
            [945.9152542372881, 307.2611480323692, 0.9271186440677966, 0.9271186440677966],
            [1063.915254237288, 307.2611480323692, 0.9271186440677966, 0.9271186440677966],
            [769.3050847457628, 338.74240590081763, 0.9271186440677966, 0.9271186440677966]],

            L: [[36.562245464411944, 998.9864041737575, 0.9513043478260866, 0.9513043478260866],
            [1223.2975715803964, 950.9853628898564, 0.9513043478260866, 0.9513043478260866],
            [822.6197970250024, 1224.8674093023442, 0.9513043478260866, 0.9513043478260866],
            [1331.6247973357272, 1222.7722446189573, 0.9513043478260866, 0.9513043478260866],
            [699.0669361122533, 845.0413392611738, 0.9513043478260866, 0.9513043478260866],
            [695.4452981530096, 776.0601853970486, 0.9513043478260866, 0.9513043478260866],
            [677.8320072020172, 417.1491866115162, 0.9513043478260866, 0.9513043478260866],
            [679.5688258858983, 711.3319303437235, 0.9513043478260866, 0.9513043478260866],
            [938.5688258858983, 312.4381389710139, 0.9513043478260866, 0.9513043478260866],
            [1046.5741063562023, 313.1423260518964, 0.9513043478260866, 0.9513043478260866],
            [770, 304.0398788646271, 0.9513043478260866, 0.9513043478260866]],

            M: [[1238.2392030224548, 984.2516620217511, 0.9869179935459229, 0.9869179935459229],
            [2.4539944042687694, 940.4527974012531, 0.9869179935459229, 0.9869179935459229],
            [17.480659797558474, 1197.6925458197907, 0.9869179935459229, 0.9869179935459229],
            [510.23920302245483, 1199.2104132984973, 0.9869179935459229, 0.9869179935459229],
            [667.0000000000002, 247.31317011381478, 0.9602466875756287, 0.9602466875756287],
            [652.0000000000002, 181.3387825475516, 0.9602466875756287, 0.9602466875756287],
            [731.2537162290371, 470.3335156222087, 0.9602466875756287, 0.9602466875756287],
            [731.2378409220285, 360.4294420120742, 0.9602466875756287, 0.9602466875756287],
            [1110.5703709915297, 687.5315141249439, 0.9602466875756287, 0.9602466875756287],
            [1210.5703709915297, 690.5315141249439, 0.9602466875756287, 0.9602466875756287],
            [950.6336042034031, 678.6742498788147, 0.9602466875756287, 0.9602466875756287]],

            S: [[-13.872593729789969, 1144.2101091275686, 0.9920221537049054, 0.9920221537049054],
            [1252.694327787931, 1150.216044922361, 0.9920221537049054, 0.9920221537049054],
            [501.23058359551396, 396.3007743200037, 0.9920221537049054, 0.9920221537049054],
            [957.2400286268836, 399.6718875567317, 0.9920221537049054, 0.9920221537049054],
            [648.3197646470927, 519.5505854810923, 0.9920221537049054, 0.9920221537049054],
            [648.3197646470927, 452.61966240459714, 0.9920221537049054, 0.9920221537049054],
            [678.3355246624726, 741.9750816280938, 0.9920221537049054, 0.9920221537049054],
            [680.3203930684949, 636.5230124112423, 0.9920221537049054, 0.9920221537049054],
            [731.0000000000002, 966.378621443881, 0.9920221537049054, 0.9920221537049054],
            [908.0000000000002, 962.3992106035763, 0.9920221537049054, 0.9920221537049054],
            [1080.3141517072802, 955.3776667749779, 0.9920221537049054, 0.9920221537049054]],

            SS: [[-43.42187367616458, 954.2732783992369, 1.0380949297342945, 1.0380949297342945],
            [1248.0091983208576, 914.69850712916, 1.0380949297342945, 1.0380949297342945],
            [902.2538863900702, 922.7617995550013, 1.0380949297342945, 1.0380949297342945],
            [494.2494416694253, 921.3212492687921, 1.0380949297342945, 1.0380949297342945],
            [599.9797538464649, 241.74642064328975, 1.0380949297342945, 1.0380949297342945],
            [601.9797538464649, 172.79663070231038, 1.0380949297342945, 1.0380949297342945],
            [540.0000000000023, 346.77716568612914, 1.0380949297342945, 1.0380949297342945],
            [513.0000000000018, 469.6021769842562, 1.0380949297342945, 1.0380949297342945],
            [1278.1745389608827, 544.3229923774977, 1.0380949297342945, 1.0380949297342945],
            [1252.221760692415, 329.9022616788652, 1.0380949297342945, 1.0380949297342945],
            [1116.2782497938556, 511.879664160062, 1.0380949297342945, 1.0380949297342945]],
        },

        KID: {
            //140
            LL: [[1341.5084745762713, 836.0947204837285, 0.9271186440677966, 0.9271186440677966],
            [63.45762711864404, 801.8185787809157, 0.9271186440677966, 0.9271186440677966],
            [948.1864406779662, 1042.3867043191121, 0.9271186440677966, 0.9271186440677966],
            [467.1864406779662, 1042.0429690588692, 0.9271186440677966, 0.9271186440677966],
            [687.4915254237288, 388.0734121663291, 0.9271186440677966, 0.9271186440677966],
            [692.4915254237288, 331.81059233671874, 0.9271186440677966, 0.9271186440677966],
            [706.9322033898305, 271.0264011084249, 0.9271186440677966, 0.9271186440677966],
            [674.6271186440678, 186.0807476169069, 0.9271186440677966, 0.9271186440677966],
            [777.4745762711865, 559.7594231450855, 0.9271186440677966, 0.9271186440677966],
            [963.5593220338983, 569.7481863667866, 0.9271186440677966, 0.9271186440677966],
            [1108.2542372881358, 561.2571960497679, 0.9271186440677966, 0.9271186440677966]],

            //130
            L: [[1334.5218277695888, 797.722133366063, 1, 1],
            [29.480760195244557, 762.0724579612279, 1, 1],
            [470.13727815918367, 934.9653592221149, 1, 1],
            [928.130611078217, 935.8935607279844, 1, 1],
            [694.0000000000002, 397.7687961580872, 1, 1],
            [694.0000000000002, 343.83310113145023, 1, 1],
            [705.0000000000005, 280.27242837908693, 1, 1],
            [705.0000000000005, 193.42195745007027, 1, 1],
            [980.3612031708881, 572.9205486810149, 1, 1],
            [1163.182608638008, 592.2168054768156, 1, 1],
            [736.210301380434, 569.3917920343897, 1, 1]],

            //120
            M: [[-2.334787499665026, 769.5589434916637, 1.0631148759734803, 1.0631148759734803],
            [1330.434849356454, 752.1704722171578, 1.0631148759734803, 1.0631148759734803],
            [937.0011959742965, 814.9747953039692, 1.0631148759734803, 1.0631148759734803],
            [499.9973068437332, 812.8045387740534, 1.0631148759734803, 1.0631148759734803],
            [528.2239328677365, 391.2913373023275, 1.0631148759734803, 1.0631148759734803],
            [528.2239328677365, 251.336730719206, 1.0631148759734803, 1.0631148759734803],
            [534.4999999999999, 189.27753855695565, 1.0631148759734803, 1.0631148759734803],
            [534.4999999999999, 349.42776644548667, 1.0631148759734803, 1.0631148759734803],
            [1126.3445867825194, 288.6702566735936, 1.0631148759734803, 1.0631148759734803],
            [1244.1870206372046, 303.6684126343498, 1.0631148759734803, 1.0631148759734803],
            [1149.0949000093824, 457.29327531359655, 1.0631148759734803, 1.0631148759734803]],

            //110
            S: [[869.5312649135285, 741.2836644851309, 0.9970687951186153, 0.9970687951186153],
            [1361.9243083601311, 722.3010605928858, 0.9970687951186153, 0.9970687951186153],
            [34.789089213906664, 324.2206442891829, 0.9970687951186153, 0.9970687951186153],
            [466.7907559841485, 320.6759830921782, 0.9970687951186153, 0.9970687951186153],
            [377.69787802504743, 514.4861854264782, 0.9970687951186153, 0.9970687951186153],
            [355.69787802504743, 459.543412671807, 0.9970687951186153, 0.9970687951186153],
            [375.0000000000007, 393.57473392055795, 0.9970687951186153, 0.9970687951186153],
            [399.0000000000007, 610.3869566239343, 0.9970687951186153, 0.9970687951186153],
            [226.35735080707184, 501.49715051961107, 0.9970687951186153, 0.9970687951186153],
            [312.56824102350447, 515.788296815416, 0.9970687951186153, 0.9970687951186153],
            [86.65724765366838, 464.6396282124931, 0.9970687951186153, 0.9970687951186153]],

            //100
            SS: [[897.3088808414254, 714.8772456569252, 1.019331676670684, 1.019331676670684],
            [1364.6755706679091, 709.68409083083, 1.019331676670684, 1.019331676670684],
            [97.56179280691248, 302.8650331438324, 1.019331676670684, 1.019331676670684],
            [511.56957106804043, 301.8748272411623, 1.019331676670684, 1.019331676670684],
            [395.9137616046969, 418.88434197637173, 1.019331676670684, 1.019331676670684],
            [392.9746598534005, 363.87034459704535, 1.019331676670684, 1.019331676670684],
            [447.5000000000007, 598.5000146754867, 1.019331676670684, 1.019331676670684],
            [430.83333206176826, 515.510858236212, 1.019331676670684, 1.019331676670684],
            [365.4646907162851, 481.7929297228258, 1.019331676670684, 1.019331676670684],
            [280.0167349379735, 495.7747245444168, 1.019331676670684, 1.019331676670684],
            [138.11558958907153, 436.82231386613455, 1.019331676670684, 1.019331676670684]],
        }
    },

    SHIRTS: {
        MEN: {
            LL: [[522.678344415861, 1165.998890696827, 0.9529616724738676, 0.9529616724738676],
            [1286.0575486940388, 1803.432370232326, 0.9529616724738676, 0.9529616724738676],
            [9.758703375711661, 1803.432370232326, 0.9529616724738676, 0.9529616724738676],
            [619.046463067051, 1997.0039762851743, 0.9529616724738676, 0.9529616724738676],
            [584.7980683771661, 1584.0326795047745, 0.9529616724738676, 0.9529616724738676],
            [9.019876637449414, 1948.6251914809677, 0.9529616724738676, 0.9529616724738676],
            [1284.5582272043725, 1966.6239638037218, 0.9529616724738676, 0.9529616724738676],
            [165.82380247556932, 422.99968219456406, 0.9529616724738676, 0.9529616724738676]],

            L: [[536.2559071532305, 1147.6636771866522, 0.9634150731851181, 0.9634150731851181],
            [1305.466563796448, 1733.8718761144632, 0.9634150731851181, 0.9634150731851181],
            [-14.816157514253803, 1104.059445825087, 0.9634150731851181, 0.9634150731851181],
            [686.8923364793831, 1540.7390561414206, 0.9634150731851181, 0.9634150731851181],
            [-3.115992201529224, 1494.5144398588889, 0.9634150731851181, 0.9634150731851181],
            [26.644615997039864, 1675.8044040581653, 0.9634150731851181, 0.9634150731851181],
            [627.2269723688718, 1675.803918704233, 0.9634150731851181, 0.9634150731851181],
            [1505.000269532303, 533.7984571238748, 0.9634150731851181, 0.9634150731851181]],

            M: [[498.09524135562674, 1128.378147737829, 0.9637557960332351, 0.9637557960332351],
            [1323.8927779373744, 1094.8102770371765, 0.9637557960332351, 0.9637557960332351],
            [-32.11055523710189, 1094.8102770371765, 0.9637557960332351, 0.9637557960332351],
            [1248.4894603486302, 1453.7536695088565, 0.9637557960332351, 0.9637557960332351],
            [-17.64788974979865, 1498.7408298865137, 0.9637557960332351, 0.9637557960332351],
            [814.2864812325689, 1474.7535458034374, 0.9637557960332351, 0.9637557960332351],
            [691.2864812325689, 1246.7917570498914, 0.9637557960332351, 0.9637557960332351],
            [645.7630662020906, 1493.7507091606876, 0.9637557960332351, 0.9637557960332351]],

            S: [[501, 1074.3133617122312, 0.8759797358234079, 0.8759797358234079],
            [1350, 1053.4777028477058, 0.899270312764109, 0.899270312764109],
            [-17, 1049.7134506386828, 0.899270312764109, 0.899270312764109],
            [1297, 1420.8614976239896, 0.8942210709086563, 0.8942210709086563],
            [9, 1421.6055222191378, 0.8942210709086563, 0.8942210709086563],
            [786, 1409.618290043215, 0.956407940055981, 0.956407940055981],
            [726, 1218.6681098669214, 0.956407940055981, 0.956407940055981],
            [622.0000000000041, 1454.5949732003671, 0.9506600935828659, 0.9506600935828659]],

            //new
            SS: [[584.7777189501685, 1080.114374732745, 0.9744298411102414, 0.9744298411102414],
            [1359.9369748646354, 1043.4087662086172, 0.9744298411102414, 0.9744298411102414],
            [-76.06854308957253, 1043.4087662086172, 0.9744298411102414, 0.9744298411102414],
            [-42.4134341016636, 1389.9388185028365, 0.9744298411102414, 0.9744298411102414],
            [1262.5487872473468, 1394.92884598402, 0.9744298411102414, 0.9744298411102414],
            [718.6489519729305, 1193.1154712101822, 0.9744298411102414, 0.9744298411102414],
            [716.6489441902024, 1336.0376749386928, 0.9744298411102414, 0.9744298411102414],
            [537.5000050365928, 947.5229267850866, 0.9744298411102414, 0.9744298411102414]],
        },

        LADIES: {
            LL: [[557.0383275261324, 1008.4079560789972, 0.9529616724738676, 0.9529616724738676],
            [1312.178571447198, 1521.0698094140296, 0.9529616724738676, 0.9529616724738676],
            [8.428571428571445, 956.1164962843711, 0.9529616724738676, 0.9529616724738676],
            [1374.588850174216, 660.2444889144725, 0.9529616724738676, 0.9529616724738676],
            [827.5888501742161, 1383.1851883984598, 0.9529616724738676, 0.9529616724738676],
            [132.05574912891984, 1122.3604937581033, 0.9529616724738676, 0.9529616724738676],
            [129.31358885017426, 1278.8626585802501, 0.9529616724738676, 0.9529616724738676],
            [733.7595818815331, 1488.891679839771, 0.9529616724738676, 0.9529616724738676]],

            L: [[512.5082088140408, 995.4068704464215, 0.9699622222855379, 0.9699622222855379],
            [1325.257481848958, 964.8673971266289, 0.9699622222855379, 0.9699622222855379],
            [-12.742498272893442, 964.8673971266289, 0.9699622222855379, 0.9699622222855379],
            [-6.695594913059892, 1298.324316157184, 0.9699622222855379, 0.9699622222855379],
            [1384.2935074378154, 1296.3253556707884, 0.9699622222855379, 0.9699622222855379],
            [802.9771365181527, 1125.8475469454222, 0.9699622222855379, 0.9699622222855379],
            [793.9408364299784, 1265.828371315899, 0.9699622222855379, 0.9699622222855379],
            [559.4999999999975, 1231.8331312239366, 0.9699622222855379, 0.9699622222855379]],

            M: [[482.09446166262273, 972.1083473568503, 0.95311566698168, 0.95311566698168],
            [1344.7373889979922, 944.2001109587665, 0.95311566698168, 0.95311566698168],
            [-22.26259113876023, 944.2001109587665, 0.95311566698168, 0.95311566698168],
            [-15.960453917844973, 1257.1714915036366, 0.95311566698168, 0.95311566698168],
            [1403.0071811620114, 1257.1728082574657, 0.95311566698168, 0.95311566698168],
            [837.4999999999994, 1097.279077278543, 0.95311566698168, 0.95311566698168],
            [831.4999999999994, 1238.1836126259298, 0.95311566698168, 0.95311566698168],
            [530.944441638042, 1203.6907447629626, 0.95311566698168, 0.95311566698168]],

            S: [[455.94870027489543, 950.0700128608308, 0.9536771075403067, 0.9536771075403067],
            [1353.4480038119377, 937.5175397509225, 0.9536771075403067, 0.9536771075403067],
            [-30.55197596718739, 937.5175397509225, 0.9536771075403067, 0.9536771075403067],
            [-29.330227411633643, 1224.4904448670088, 0.9536771075403067, 0.9536771075403067],
            [1414.628655084458, 1224.49270950792, 0.9536771075403067, 0.9536771075403067],
            [866, 1062.5641656416565, 0.9536771075403067, 0.9536771075403067],
            [857, 1205.5649856498565, 0.9536771075403067, 0.9536771075403067],
            [526.463659090733, 1154.1414940154464, 0.9536771075403067, 0.9536771075403067]],

            SS: [[632.4782896311337, 929.0593707493207, 0.9818649999999951, 0.9818649999999951],
            [1371.628004953458, 905.2285684005759, 0.9818649999999951, 0.9818649999999951],
            [-63.60750269335324, 905.2285684005759, 0.9818649999999951, 0.9818649999999951],
            [1403.2367994042525, 1193.8555252038382, 0.9818649999999951, 0.9818649999999951],
            [-32.82492331460338, 1194.8524577141372, 0.9818649999999951, 0.9818649999999951],
            [888.7437653675232, 1043.8752810590256, 0.9818649999999951, 0.9818649999999951],
            [887.7113015447461, 1183.8601017871936, 0.9818649999999951, 0.9818649999999951],
            [602.5000000000008, 1144.4787090078364, 0.9818649999999951, 0.9818649999999951]],
        },

        KID: {
            //140
            LL: [[784.0452961672474, 898.9600923170483, 0.9529616724738676, 0.9529616724738676],
            [1428.7247386759582, 866.5937037595156, 0.9529616724738676, 0.9529616724738676],
            [351.7247386759582, 866.5937037595156, 0.9529616724738676, 0.9529616724738676],
            [1435.3379790940767, 1131.1324965902586, 0.9529616724738676, 0.9529616724738676],
            [8.337979094076672, 1118.4018912801496, 0.9529616724738676, 0.9529616724738676],
            [485.79790940766554, 996.1882813791115, 0.9529616724738676, 0.9529616724738676],
            [483.79790940766554, 1130.1882813791115, 0.9529616724738676, 0.9529616724738676],
            [94.69686411149826, 721.8770679406085, 0.9529616724738676, 0.9529616724738676]],

            //130
            L: [[823.7503381801978, 863.9195458873286, 0.9531920431528258, 0.9531920431528258],
            [1440.6415858615787, 838.9901009077522, 0.9531920431528258, 0.9531920431528258],
            [419.0416102756408, 991.9371870444318, 0.9531920431528258, 0.9531920431528258],
            [1.9611322329818393, 976.9382011789312, 0.9531920431528258, 0.9531920431528258],
            [1.9611322329818393, 352.97781580782134, 0.9531920431528258, 0.9531920431528258],
            [1418.9999999999989, 975.9384547125713, 0.9531920431528258, 0.9531920431528258],
            [931.9999999999989, 979.9375673448842, 0.9531920431528258, 0.9531920431528258],
            [143.69116663674706, 684.339417787669, 0.9531920431528258, 0.9531920431528258]],

            //120
            M: [[387.42452821254994, 833.8788051874535, 0.9366435385132015, 0.9366435385132015],
            [986.6000061035153, 813.3961601255406, 0.9366435385132015, 0.9366435385132015],
            [-4.399993896484602, 813.3961601255406, 0.9366435385132015, 0.9366435385132015],
            [1459.827659518347, 346.11956840377127, 0.9366435385132015, 0.9366435385132015],
            [1459.796535665044, 580.9046987015529, 0.9366435385132015, 0.9366435385132015],
            [1392.9442950604716, 907.178643351837, 0.9366435385132015, 0.9366435385132015],
            [870.942075075814, 915.1595420344379, 0.9366435385132015, 0.9366435385132015],
            [1747.0000000000018, 758.3123525736312, 0.8757442408703265, 0.8757442408703265]],

            //110
            S: [[447.8894369679149, 795.0797526414741, 0.9666183820637266, 0.9666183820637266],
            [1044.6941565467184, 779.7524229390261, 0.9666183820637266, 0.9666183820637266],
            [64.69415653181647, 779.7524229390261, 0.9666183820637266, 0.9666183820637266],
            [1457.8542013470744, 335.39563217852935, 0.9666183820637266, 0.9666183820637266],
            [1457.7971537525852, 546.7266933463143, 0.9666183820637266, 0.9666183820637266],
            [1424.500000000001, 663.0052709766363, 0.9666183820637266, 0.9666183820637266],
            [1424.500000000001, 793.6991782258517, 0.9666183820637266, 0.9666183820637266],
            [-3.13322940241882, 764.1579267488875, 0.9666183820637266, 0.9666183820637266]],

            //100
            SS: [[337.26946710603283, 758.973810239941, 0.964117017627794, 0.964117017627794],
            [921.5875892358866, 743.1941616504228, 0.964117017627794, 0.964117017627794],
            [-34.41241076411393, 743.1941616504228, 0.964117017627794, 0.964117017627794],
            [1469.6211047346887, 321.8264397071749, 0.964117017627794, 0.964117017627794],
            [1460.5564992797804, 523.1565238536289, 0.964117017627794, 0.964117017627794],
            [1435.0000000000005, 624.0765671981782, 0.964117017627794, 0.964117017627794],
            [1426.7614077163003, 754.5515059578397, 0.964117017627794, 0.964117017627794],
            [1345.0903190480415, 291.7023595017197, 0.964117017627794, 0.964117017627794]],
        }
    },

    HOODIE: {
        MEN: {
            LL: [[76.00000000000028, 124.49999999999977, 1.4501779359430604, 1.4501779359430604],
            [916.0000015258788, 887.0000052765873, 1.4501779359430604, 1.4501779359430604],
            [77.5, 1982.5, 1.4501779359430604, 1.4501779359430604],
            [1438, 1168, 1.4501779359430604, 1.4501779359430604],
            [816, 2457, 1.4501779359430604, 1.4501779359430604],
            [1439, 1706, 1.4501779359430604, 1.4501779359430604],
            [943, 1982, 1.4501779359430604, 1.4501779359430604],
            [93.5, 1167, 1.4501779359430604, 1.4501779359430604],
            [1334, 2302.5, 1.4501779359430604, 1.4501779359430604],
            [1595, 2281.5, 1.4501779359430604, 1.4501779359430604],
            [375.5, 1164, 1.4501779359430604, 1.4501779359430604],
            [1103.5, 126.5, 1.4501779359430604, 1.4501779359430604],
            [671.5, 955, 1.4501779359430604, 1.4501779359430604]],

            L: [[293.197481744309, 1047.525319465384, 1.7486432938292116, 1.7486432938292116],
            [742.0344574308814, 993.0000137686727, 1.7486432938292116, 1.7486432938292116],
            [1082.846353311302, 1757.7109183803357, 1.7486432938292116, 1.7486432938292116],
            [27.953987361917655, 2189.1561087537416, 1.7486432938292116, 1.7486432938292116],
            [30.452884111949345, 1664.8545075496593, 1.7486432938292116, 1.7486432938292116],
            [446.22340811856213, 2058.7056139771034, 1.7486432938292116, 1.7486432938292116],
            [1349.2247391329324, 1093.5702898591246, 1.7486432938292116, 1.7486432938292116],
            [50.967777986519906, 1024.077470006025, 1.7486432938292116, 1.7486432938292116],
            [808.0496462485692, 53.94441330285633, 1.7486432938292116, 1.7486432938292116],
            [877.0115841246661, 2086.176137584568, 1.7486432938292116, 1.7486432938292116],
            [1562.1337210105546, 57.44290169298233, 1.7486432938292116, 1.7486432938292116],
            [890.4111883775588, 20.903599836267745, 1.7486432938292116, 1.7486432938292116],
            [-21.085729636938254, 11.407378860951894, 1.7486432938292116, 1.7486432938292116]],

            M: [[18.15628906149709, 40.89145829945687, 1.6055150137290262, 1.6055150137290262],
            [786.030765563287, 2537.261130282899, 1.6055150137290262, 1.6055150137290262],
            [1138.4035191935327, 1607.797564123411, 1.6055150137290262, 1.6055150137290262],
            [765.020920583035, 1896.2893468724826, 1.6055150137290262, 1.6055150137290262],
            [43.1988686010863, 1499.3133339946783, 1.6055150137290262, 1.6055150137290262],
            [73.19148486589748, 2049.2801024651894, 1.6055150137290262, 1.6055150137290262],
            [1410.8619241519689, 1100.3374419587965, 1.6055150137290262, 1.6055150137290262],
            [62.70576008726246, 883.3474718386067, 1.6055150137290262, 1.6055150137290262],
            [482.56079275305524, 1027.3303122851983, 1.6055150137290262, 1.6055150137290262],
            [1005.4320696362631, 74.38789346265759, 1.6055150137290262, 1.6055150137290262],
            [500.59795755350535, 1754.294845180089, 1.6055150137290262, 1.6055150137290262],
            [1095.4136102982907, 63.890854089829645, 1.6055150137290262, 1.6055150137290262],
            [635.5231357035922, 807.3436048969936, 1.6055150137290262, 1.6055150137290262]],

            S: [[-40.830174090656556, 61.602928887328744, 1.5662850879226613, 1.5662850879226613],
            [446.11174052585795, 2351.095173520123, 1.5662850879226613, 1.5662850879226613],
            [1156.3983505789004, 1480.8780703995546, 1.5662850879226613, 1.5662850879226613],
            [1451.8518330472102, 996.7081167588915, 1.5662850879226613, 1.5662850879226613],
            [756.023381828098, 828.7951619525626, 1.5662850879226613, 1.5662850879226613],
            [45.198376352073524, 1872.254238249034, 1.5662850879226613, 1.5662850879226613],
            [654.0482404032334, 1869.2557926274926, 1.5662850879226613, 1.5662850879226613],
            [1586.3306663396684, 71.1614771425958, 1.5662850879226613, 1.5662850879226613],
            [907.497784879443, 71.1614771425958, 1.5662850879226613, 1.5662850879226613],
            [62.70576008726201, 990.6848010820152, 1.5662850879226613, 1.5662850879226613],
            [949.4874476501782, 1345.5008662977693, 1.5662850879226613, 1.5662850879226613],
            [139.64521345871373, 994.1101909160113, 1.5662850879226613, 1.5662850879226613],
            [985.4369921263888, 92.07805883199376, 1.5662850879226613, 1.5662850879226613]],

            //new
            SS: [[-63.322997655403015, 7.241386509653353, 1.5519055164344346, 1.5519055164344346],
            [991.9759657147306, 2251.834576799238, 1.5519055164344346, 1.5519055164344346],
            [9.18149897561608, 906.817149231573, 1.5519055164344346, 1.5519055164344346],
            [1428.8578102392298, 975.3564084692796, 1.5519055164344346, 1.5519055164344346],
            [41.201801655459064, 1783.9736708706075, 1.5519055164344346, 1.5519055164344346],
            [588.0650353576646, 1749.9899268634817, 1.5519055164344346, 1.5519055164344346],
            [1194.9165672410243, 1779.970567697237, 1.5519055164344346, 1.5519055164344346],
            [1588.330447460857, 69.76140494861608, 1.5519055164344346, 1.5519055164344346],
            [892.0017227802182, 75.2589178237775, 1.5519055164344346, 1.5519055164344346],
            [680.0547290967309, 726.9471852545432, 1.5519055164344346, 1.5519055164344346],
            [1591.3296973714723, 1501.0767407781516, 1.5519055164344346, 1.5519055164344346],
            [708.5053090223689, 915.7897707826278, 1.5519055164344346, 1.5519055164344346],
            [993.4354800491019, 49.699770985062514, 1.5519055164344346, 1.5519055164344346]],
        },

        LADIES: {
            LL: [[0, 0, 0, 0]],

            L: [[0, 0, 0, 0]],

            M: [[0, 0, 0, 0]],

            S: [[0, 0, 0, 0]],

            SS: [[0, 0, 0, 0]],
        },

        KID: {
            //140
            LL: [[1196.2349999259695, 127.73277133673957, 0.8423974398907308, 0.8423974398907308],
            [948.4999992400408, 1728.8075827846956, 0.8423974398907308, 0.8423974398907308],
            [78.00000917911507, 126.82956813507303, 0.8423974398907308, 0.8423974398907308],
            [814.9999997615812, 981.5331049788604, 0.8423974398907308, 0.8423974398907308],
            [608.0000028312209, 1356.3697656032812, 0.8423974398907308, 0.8423974398907308],
            [1141.9999948590998, 1330.382464911302, 0.8423974398907308, 0.8423974398907308],
            [1546.9999888837337, 1345.3745825821857, 0.8423974398907308, 0.8423974398907308],
            [516.5000052601102, 808.0825884894248, 0.8423974398907308, 0.8423974398907308],
            [1464.9999911189082, 906.5396735864576, 0.8423974398907308, 0.8423974398907308],
            [1668.9999880790713, 830.5729545316159, 0.8423974398907308, 0.8423974398907308],
            [1165.4999955743558, 796.0874054683293, 0.8423974398907308, 0.8423974398907308],
            [631.5000007301567, 129.2879669536252, 0.8423974398907308, 0.8423974398907308],
            [78.50000898539986, 882.9586607594274, 0.8423974398907308, 0.8423974398907308]],

            //130
            L: [[1174.9999913126233, 96.50000426173199, 0.9124646337394209, 0.9124646337394209],
            [870.5000015172957, 1422.4999910593033, 0.9124646337394209, 0.9124646337394209],
            [695.0000000149009, 70.00000508129574, 0.9124646337394209, 0.9124646337394209],
            [107.38557951591184, 1163.6261178875488, 0.9124646337394209, 0.9124646337394209],
            [1095.8349897460723, 1149.6352688483425, 0.9124646337394209, 0.9124646337394209],
            [1426.6510894294056, 1159.6287324477755, 0.9124646337394209, 0.9124646337394209],
            [1533.5916412907848, 784.8738474690501, 0.9124646337394209, 0.9124646337394209],
            [873.497777639678, 786.3313608653633, 0.9124646337394209, 0.9124646337394209],
            [63.40891429929505, 90.32812730847974, 0.9124646337394209, 0.9124646337394209],
            [65.40780311913392, 748.8973785110926, 0.9124646337394209, 0.9124646337394209],
            [1159.3388788766365, 690.3941103108097, 0.9124646337394209, 0.9124646337394209],
            [417.5000039190055, 717.4999940693381, 0.9124646337394209, 0.9124646337394209],
            [152.50000789761486, 59.50000387430168, 0.9124646337394209, 0.9124646337394209]],

            //120
            M: [[723.0000360107446, 57.223180279374276, 0.8959640941765351, 0.8959640941765351],
            [1645.5, 1338.046069680303, 0.8959640941765351, 0.8959640941765351],
            [1380.000065185551, 51.726942409250455, 0.8959640941765351, 0.8959640941765351],
            [126.99998626708893, 1055.5578833404227, 0.8959640941765351, 0.8959640941765351],
            [1058.5000372924828, 1060.5571925163417, 0.8959640941765351, 0.8959640941765351],
            [1546.5000670776408, 776.6156509964223, 0.8959640941765351, 0.8959640941765351],
            [1151.000048767093, 695.631985639116, 0.8959640941765351, 0.8959640941765351],
            [541.5000056152347, 49.25230956458765, 0.8959640941765351, 0.8959640941765351],
            [67.99997229003691, 56.75060854689406, 0.8959640941765351, 0.8959640941765351],
            [69.99997241210721, 674.6233996008035, 0.8959640941765351, 0.8959640941765351],
            [856.5000248413102, 736.1108976779141, 0.8959640941765351, 0.8959640941765351],
            [134.49999078369046, 5.218514340847719, 0.8959640941765351, 0.8959640941765351],
            [426.5000273437514, 607.095094674606, 0.8959640941765351, 0.8959640941765351]],

            //110
            S: [[724, 27.22000625002306, 0.8936282436207303, 0.8936282436207303],
            [135.5, 1246.0392808929976, 0.8936282436207303, 0.8936282436207303],
            [1387, 9.727331858037473, 0.8936282436207303, 0.8936282436207303],
            [550, 548.6460633941258, 0.8936282436207303, 0.8936282436207303],
            [54, 780.5929527360203, 0.8936282436207303, 0.8936282436207303],
            [550, 932.5581560979509, 0.8936282436207303, 0.8936282436207303],
            [1549, 694.6126403075593, 0.8936282436207303, 0.8936282436207303],
            [544.5, 42.24747728007759, 0.8936282436207303, 0.8936282436207303],
            [66, 35.748850831579944, 0.8936282436207303, 0.8936282436207303],
            [907, 679.6014229702869, 0.8936282436207303, 0.8936282436207303],
            [357.5, 749.0856271280059, 0.8936282436207303, 0.8936282436207303],
            [1088.5, 473.1009651197862, 0.8936282436207303, 0.8936282436207303],
            [132.5, -63.77564417021847, 0.8936282436207303, 0.8936282436207303]],

            //100
            SS: [[776.9999972134823, 3.2952249461700944, 0.8765879927214062, 0.8765879927214062],
            [1311.4999937415128, 563.2152011668685, 0.8765879927214062, 0.8765879927214062],
            [1406.999989375472, 24.790736629664707, 0.8765879927214062, 0.8765879927214062],
            [53.000011146068175, 728.467723739515, 0.8765879927214062, 0.8765879927214062],
            [522.5000041276215, 843.3963076782738, 0.8765879927214062, 0.8765879927214062],
            [868.4999989718198, 653.5143187812058, 0.8765879927214062, 0.8765879927214062],
            [575.0000033676622, 494.6130637294418, 0.8765879927214062, 0.8765879927214062],
            [418.0000057071444, 22.906228153567497, 0.8765879927214062, 0.8765879927214062],
            [360.0000075697899, 563.5305672174534, 0.8765879927214062, 0.8765879927214062],
            [1640.9999884814029, 604.5051016636629, 0.8765879927214062, 0.8765879927214062],
            [593.0000030994413, 26.90374370929527, 0.8765879927214062, 0.8765879927214062],
            [1117.499993517995, 405.99899010146123, 0.8765879927214062, 0.8765879927214062],
            [34.500009641051065, -93.68926484450662, 0.8765879927214062, 0.8765879927214062]],
        }
    },
}

export const SIZE_OUTPUT_PATTERN = {
    /*
    POLO: {
        MEN: {
            LL: { Width: 435, Height: 590 },
            L: { Width: 416, Height: 590 },
            M: { Width: 391, Height: 590 },
            S: { Width: 372, Height: 590 },
            SS: { Width: 316, Height: 590 },
        },

        LADIES: {
            LL: { Width: 332, Height: 590 },
            L: { Width: 313, Height: 590 },
            M: { Width: 292, Height: 590 },
            S: { Width: 284, Height: 590 },
            SS: { Width: 279, Height: 590 },
        },

        KID: {
            //140
            LL: { Width: 258, Height: 590 },
            //130
            L: { Width: 241, Height: 590 },
            //120
            M: { Width: 228, Height: 590 },
            //110
            S: { Width: 220, Height: 590 },
            //100
            SS: { Width: 206, Height: 590 },
        }
    },

    SHIRTS: {
        MEN: {
            LL: { Width: 575, Height: 574 },
            L: { Width: 492, Height: 574 },
            M: { Width: 430, Height: 574 },
            S: { Width: 420, Height: 574 },
            SS: { Width: 397, Height: 574 },
        },

        LADIES: {
            LL: { Width: 438, Height: 574 },
            L: { Width: 371, Height: 574 },
            M: { Width: 361, Height: 574 },
            S: { Width: 350, Height: 574 },
            SS: { Width: 341, Height: 574 },
        },

        KID: {
            //140
            LL: { Width: 326, Height: 574 },
            //130
            L: { Width: 283, Height: 574 },
            //120
            M: { Width: 265, Height: 574 },
            //110
            S: { Width: 229, Height: 574 },
            //100
            SS: { Width: 218, Height: 574 },
        }
    }
    */

    // Change 2023.01.12
    POLO: {
        MEN: {
            LL: { Width: 435, Height: 590 },
            L: { Width: 418, Height: 590 },
            M: { Width: 389, Height: 590 },
            S: { Width: 372, Height: 590 },
            SS: { Width: 363, Height: 590 },
        },

        LADIES: {
            LL: { Width: 370, Height: 590 },
            L: { Width: 360, Height: 590 },
            M: { Width: 352, Height: 590 },
            S: { Width: 330, Height: 590 },
            SS: { Width: 271, Height: 590 },
        },

        KID: {
            //140
            LL: { Width: 310, Height: 590 },
            //130
            L: { Width: 278, Height: 590 },
            //120
            M: { Width: 242, Height: 590 },
            //110
            S: { Width: 220, Height: 590 },
            //100
            SS: { Width: 204, Height: 590 },
        }
    },

    SHIRTS: {
        MEN: {
            LL: { Width: 575, Height: 574 },
            L: { Width: 492, Height: 574 },
            M: { Width: 430, Height: 574 },
            S: { Width: 420, Height: 574 },
            SS: { Width: 397, Height: 574 },
        },

        LADIES: {
            LL: { Width: 438, Height: 574 },
            L: { Width: 371, Height: 574 },
            M: { Width: 361, Height: 574 },
            S: { Width: 350, Height: 574 },
            SS: { Width: 341, Height: 574 },
        },

        KID: {
            //140
            LL: { Width: 326, Height: 574 },
            //130
            L: { Width: 283, Height: 574 },
            //120
            M: { Width: 265, Height: 574 },
            //110
            S: { Width: 229, Height: 574 },
            //100
            SS: { Width: 218, Height: 574 },
        }
    },

    HOODIE: {
        MEN: {
            LL: { Width: 930, Height: 600 },
            L: { Width: 882, Height: 600 },
            M: { Width: 815, Height: 600 },
            S: { Width: 760, Height: 600 },
            SS: { Width: 728, Height: 600 },
        },

        LADIES: {
            LL: { Width: 930, Height: 600 },
            L: { Width: 882, Height: 600 },
            M: { Width: 815, Height: 600 },
            S: { Width: 760, Height: 600 },
            SS: { Width: 728, Height: 600 },
        },

        KID: {
            //140
            LL: { Width: 562, Height: 600 },
            //130
            L: { Width: 510, Height: 600 },
            //120
            M: { Width: 472, Height: 600 },
            //110
            S: { Width: 430, Height: 600 },
            //100
            SS: { Width: 400, Height: 600 },
        }
    }
}

//#endregion


//#region ➝　DEVELOPMENT - TEST MODEL
/**
 * ============================================================
 *      Functions related to Output Pattern for Development
 * ============================================================
 */

export const SIZE_OUTPUT_PATTERN_DEV = {
    POLO: {
        MEN: {
            LL: { Width: 435, Height: 590 },
            L: { Width: 418, Height: 590 },
            M: { Width: 389, Height: 590 },
            S: { Width: 372, Height: 590 },
            SS: { Width: 363, Height: 590 },
        },

        LADIES: {
            LL: { Width: 370, Height: 590 },
            L: { Width: 360, Height: 590 },
            M: { Width: 352, Height: 590 },
            S: { Width: 330, Height: 590 },
            SS: { Width: 271, Height: 590 },
        },

        KID: {
            //140
            LL: { Width: 310, Height: 590 },
            //130
            L: { Width: 278, Height: 590 },
            //120
            M: { Width: 242, Height: 590 },
            //110
            S: { Width: 220, Height: 590 },
            //100
            SS: { Width: 204, Height: 590 },
        }
    },

    SHIRTS: {
        MEN: {
            LL: { Width: 575, Height: 574 },
            L: { Width: 492, Height: 574 },
            M: { Width: 430, Height: 574 },
            S: { Width: 420, Height: 574 },
            SS: { Width: 397, Height: 574 },
        },

        LADIES: {
            LL: { Width: 438, Height: 574 },
            L: { Width: 371, Height: 574 },
            M: { Width: 361, Height: 574 },
            S: { Width: 350, Height: 574 },
            SS: { Width: 341, Height: 574 },
        },

        KID: {
            //140
            LL: { Width: 326, Height: 574 },
            //130
            L: { Width: 283, Height: 574 },
            //120
            M: { Width: 265, Height: 574 },
            //110
            S: { Width: 229, Height: 574 },
            //100
            SS: { Width: 218, Height: 574 },
        }
    },
    

    HOODIE: {
        MEN: {
            LL: { Width: 930, Height: 600 },
            L: { Width: 882, Height: 600 },
            M: { Width: 815, Height: 600 },
            S: { Width: 760, Height: 600 },
            SS: { Width: 728, Height: 600 },
        },

        KID: {
            //140
            LL: { Width: 562, Height: 600 },
            //130
            L: { Width: 510, Height: 600 },
            //120
            M: { Width: 472, Height: 600 },
            //110
            S: { Width: 430, Height: 600 },
            //100
            SS: { Width: 400, Height: 600 },
        }
    }
}

export const INFO_ITEM_OUTPUT_DEV = {
    POLO: {
        MEN: {
            LL: [[290.30508474576277, 1098.6912270014013, 0.9271186440677966, 0.9271186440677966],
            [1116.0338983050847, 1052.4052157096291, 0.9271186440677966, 0.9271186440677966],
            [693.5593220338983, 1463.0266195014751, 0.9271186440677966, 0.9271186440677966],
            [62.5593220338983, 1462.0277639087149, 0.9271186440677966, 0.9271186440677966],
            [1244.7118644067796, 1468.3737779160297, 0.9271186440677966, 0.9271186440677966],
            [1244.7118644067796, 1394.7063284355386, 0.9271186440677966, 0.9271186440677966],
            [1297.0677966101694, 1288.5736748978263, 0.9271186440677966, 0.9271186440677966],
            [1298.0677966101694, 1170.618306780164, 0.9271186440677966, 0.9271186440677966],
            [99.22033898305085, 310.27826265618853, 0.9271186440677966, 0.9271186440677966],
            [198.22033898305085, 308.2763553107894, 0.9271186440677966, 0.9271186440677966],
            [135, 508.68395753695984, 0.9271186440677966, 0.9271186440677966]],

            L: [[1104.3140479074625, 1095.528890877873, 0.9945989426536995, 0.9945989426536995],
            [357.78756848639364, 1046.5305665056903, 0.9945989426536995, 0.9945989426536995],
            [633.4999999999986, 1424.7774307118991, 0.9945989426536995, 0.9945989426536995],
            [1245.0381997454697, 1426.875120061592, 0.9945989426536995, 0.9945989426536995],
            [21.956606140549297, 1162.933110175637, 0.9945989426536995, 0.9945989426536995],
            [31.956606140549184, 1088.085712115517, 0.9945989426536995, 0.9945989426536995],
            [27.5, 1276.8659905307136, 0.9945989426536995, 0.9945989426536995],
            [31.5, 1400.6913835557798, 0.9945989426536995, 0.9945989426536995],
            [213.1238900414079, 321.64811957224435, 0.9945989426536995, 0.9945989426536995],
            [313.123890041408, 322.38936892234017, 0.9945989426536995, 0.9945989426536995],
            [247.33282155816596, 519.98642117488, 0.9945989426536995, 0.9945989426536995]],

            M: [[-3.7607969775451693, 1336.1781842482087, 0.9869179935459229, 0.9869179935459229],
            [1131.4539944042688, 1008.4374161867449, 0.9869179935459229, 0.9869179935459229],
            [1248.4806597975585, 1326.6698681963592, 0.9869179935459229, 0.9869179935459229],
            [679.4806597975585, 1326.6698681963592, 0.9869179935459229, 0.9869179935459229],
            [26.75145875404803, 257.7019849639736, 0.9869179935459229, 0.9869179935459229],
            [26.7514587540479, 183.49676995343785, 0.9869179935459229, 0.9869179935459229],
            [27.10469878110871, 372.41382143507775, 0.9869179935459229, 0.9869179935459229],
            [584.1046987811087, 378.41382143507775, 0.9869179935459229, 0.9869179935459229],
            [842.2468721395649, 575.0797630266793, 0.9869179935459229, 0.9869179935459229],
            [941.2790529694289, 575.0797630266793, 0.9869179935459229, 0.9869179935459229],
            [1038.5927252371484, 573.3231413416931, 0.9869179935459229, 0.9869179935459229]],

            S: [[1155.477640050573, 1020.5168629753349, 0.9590826128692175, 0.9590826128692175],
            [-6.513766769478252, 969.5190795324057, 0.9590826128692175, 0.9590826128692175],
            [83.57468603159259, 1277.5182465539874, 0.9590826128692175, 0.9590826128692175],
            [647.5607962795787, 1279.5223382223596, 0.9590826128692175, 0.9590826128692175],
            [1250.6059267996902, 1146.7571367908856, 0.9590826128692175, 0.9590826128692175],
            [1251.6059267996902, 1072.7580537105314, 0.9590826128692175, 0.9590826128692175],
            [687.9543775637325, 867.8692812439845, 0.9590826128692175, 0.9590826128692175],
            [671.9543775637326, 754.870644232647, 0.9590826128692175, 0.9590826128692175],
            [1039.012559166447, 317.062932620502, 0.9590826128692175, 0.9590826128692175],
            [1137.0142526546965, 316.06296979292006, 0.9590826128692175, 0.9590826128692175],
            [876.0856089270359, 304.7029972672856, 0.9590826128692175, 0.9590826128692175]],

            SS: [[1117.2302270783703, 1005.5498441029678, 1.004170742225449, 1.004170742225449],
            [-24.621433064547034, 959.5538776230834, 1.004170742225449, 1.004170742225449],
            [62.301507100330014, 1251.7502167526795, 1.004170742225449, 1.004170742225449],
            [613.2870617582353, 1257.6753898814113, 1.004170742225449, 1.004170742225449],
            [1179.5017326676027, 1154.3296530914367, 1.004170742225449, 1.004170742225449],
            [606.1423201962943, 743.8039819919599, 1.004170742225449, 1.004170742225449],
            [651.9815009785227, 857.9675537040534, 1.004170742225449, 1.004170742225449],
            [1236.9815009785234, 1088.384831684215, 1.004170742225449, 1.004170742225449],
            [937.7743871553054, 322.61669331400714, 1.004170742225449, 1.004170742225449],
            [1065.5658497062173, 321.61392396824124, 1.004170742225449, 1.004170742225449],
            [749.1847137573668, 308.648177482957, 1.004170742225449, 1.004170742225449]],
        },

        LADIES: {
            LL: [[1198.1525423728813, 1002.3509288495889, 0.9271186440677966, 0.9271186440677966],
            [81.8813559322034, 953.6751314261653, 0.9271186440677966, 0.9271186440677966],
            [716.7627118644068, 1246.78220039897, 0.9271186440677966, 0.9271186440677966],
            [196.45762711864404, 1246.1792134477153, 0.9271186440677966, 0.9271186440677966],
            [1196.1016949152543, 1153.0383390120992, 0.9271186440677966, 0.9271186440677966],
            [1243.1016949152543, 1076.3677862443087, 0.9271186440677966, 0.9271186440677966],
            [689.457627118644, 917.8240119065689, 0.9271186440677966, 0.9271186440677966],
            [673.7627118644068, 810.1554899157123, 0.9271186440677966, 0.9271186440677966],
            [945.9152542372881, 307.2611480323692, 0.9271186440677966, 0.9271186440677966],
            [1063.915254237288, 307.2611480323692, 0.9271186440677966, 0.9271186440677966],
            [769.3050847457628, 338.74240590081763, 0.9271186440677966, 0.9271186440677966]],

            L: [[36.562245464411944, 998.9864041737575, 0.9513043478260866, 0.9513043478260866],
            [1223.2975715803964, 950.9853628898564, 0.9513043478260866, 0.9513043478260866],
            [822.6197970250024, 1224.8674093023442, 0.9513043478260866, 0.9513043478260866],
            [1331.6247973357272, 1222.7722446189573, 0.9513043478260866, 0.9513043478260866],
            [699.0669361122533, 845.0413392611738, 0.9513043478260866, 0.9513043478260866],
            [695.4452981530096, 776.0601853970486, 0.9513043478260866, 0.9513043478260866],
            [677.8320072020172, 417.1491866115162, 0.9513043478260866, 0.9513043478260866],
            [679.5688258858983, 711.3319303437235, 0.9513043478260866, 0.9513043478260866],
            [938.5688258858983, 312.4381389710139, 0.9513043478260866, 0.9513043478260866],
            [1046.5741063562023, 313.1423260518964, 0.9513043478260866, 0.9513043478260866],
            [770, 304.0398788646271, 0.9513043478260866, 0.9513043478260866]],

            M: [[1238.2392030224548, 984.2516620217511, 0.9869179935459229, 0.9869179935459229],
            [2.4539944042687694, 940.4527974012531, 0.9869179935459229, 0.9869179935459229],
            [17.480659797558474, 1197.6925458197907, 0.9869179935459229, 0.9869179935459229],
            [510.23920302245483, 1199.2104132984973, 0.9869179935459229, 0.9869179935459229],
            [667.0000000000002, 247.31317011381478, 0.9602466875756287, 0.9602466875756287],
            [652.0000000000002, 181.3387825475516, 0.9602466875756287, 0.9602466875756287],
            [731.2537162290371, 470.3335156222087, 0.9602466875756287, 0.9602466875756287],
            [731.2378409220285, 360.4294420120742, 0.9602466875756287, 0.9602466875756287],
            [1110.5703709915297, 687.5315141249439, 0.9602466875756287, 0.9602466875756287],
            [1210.5703709915297, 690.5315141249439, 0.9602466875756287, 0.9602466875756287],
            [950.6336042034031, 678.6742498788147, 0.9602466875756287, 0.9602466875756287]],

            S: [[-13.872593729789969, 1144.2101091275686, 0.9920221537049054, 0.9920221537049054],
            [1252.694327787931, 1150.216044922361, 0.9920221537049054, 0.9920221537049054],
            [501.23058359551396, 396.3007743200037, 0.9920221537049054, 0.9920221537049054],
            [957.2400286268836, 399.6718875567317, 0.9920221537049054, 0.9920221537049054],
            [648.3197646470927, 519.5505854810923, 0.9920221537049054, 0.9920221537049054],
            [648.3197646470927, 452.61966240459714, 0.9920221537049054, 0.9920221537049054],
            [678.3355246624726, 741.9750816280938, 0.9920221537049054, 0.9920221537049054],
            [680.3203930684949, 636.5230124112423, 0.9920221537049054, 0.9920221537049054],
            [731.0000000000002, 966.378621443881, 0.9920221537049054, 0.9920221537049054],
            [908.0000000000002, 962.3992106035763, 0.9920221537049054, 0.9920221537049054],
            [1080.3141517072802, 955.3776667749779, 0.9920221537049054, 0.9920221537049054]],

            SS: [[-43.42187367616458, 954.2732783992369, 1.0380949297342945, 1.0380949297342945],
            [1248.0091983208576, 914.69850712916, 1.0380949297342945, 1.0380949297342945],
            [902.2538863900702, 922.7617995550013, 1.0380949297342945, 1.0380949297342945],
            [494.2494416694253, 921.3212492687921, 1.0380949297342945, 1.0380949297342945],
            [599.9797538464649, 241.74642064328975, 1.0380949297342945, 1.0380949297342945],
            [601.9797538464649, 172.79663070231038, 1.0380949297342945, 1.0380949297342945],
            [540.0000000000023, 346.77716568612914, 1.0380949297342945, 1.0380949297342945],
            [513.0000000000018, 469.6021769842562, 1.0380949297342945, 1.0380949297342945],
            [1278.1745389608827, 544.3229923774977, 1.0380949297342945, 1.0380949297342945],
            [1252.221760692415, 329.9022616788652, 1.0380949297342945, 1.0380949297342945],
            [1116.2782497938556, 511.879664160062, 1.0380949297342945, 1.0380949297342945]],
        },

        KID: {
            //140
            LL: [[1341.5084745762713, 836.0947204837285, 0.9271186440677966, 0.9271186440677966],
            [63.45762711864404, 801.8185787809157, 0.9271186440677966, 0.9271186440677966],
            [948.1864406779662, 1042.3867043191121, 0.9271186440677966, 0.9271186440677966],
            [467.1864406779662, 1042.0429690588692, 0.9271186440677966, 0.9271186440677966],
            [687.4915254237288, 388.0734121663291, 0.9271186440677966, 0.9271186440677966],
            [692.4915254237288, 331.81059233671874, 0.9271186440677966, 0.9271186440677966],
            [706.9322033898305, 271.0264011084249, 0.9271186440677966, 0.9271186440677966],
            [674.6271186440678, 186.0807476169069, 0.9271186440677966, 0.9271186440677966],
            [777.4745762711865, 559.7594231450855, 0.9271186440677966, 0.9271186440677966],
            [963.5593220338983, 569.7481863667866, 0.9271186440677966, 0.9271186440677966],
            [1108.2542372881358, 561.2571960497679, 0.9271186440677966, 0.9271186440677966]],

            //130
            L: [[1334.5218277695888, 797.722133366063, 1, 1],
            [29.480760195244557, 762.0724579612279, 1, 1],
            [470.13727815918367, 934.9653592221149, 1, 1],
            [928.130611078217, 935.8935607279844, 1, 1],
            [694.0000000000002, 397.7687961580872, 1, 1],
            [694.0000000000002, 343.83310113145023, 1, 1],
            [705.0000000000005, 280.27242837908693, 1, 1],
            [705.0000000000005, 193.42195745007027, 1, 1],
            [980.3612031708881, 572.9205486810149, 1, 1],
            [1163.182608638008, 592.2168054768156, 1, 1],
            [736.210301380434, 569.3917920343897, 1, 1]],

            //120
            M: [[-2.334787499665026, 769.5589434916637, 1.0631148759734803, 1.0631148759734803],
            [1330.434849356454, 752.1704722171578, 1.0631148759734803, 1.0631148759734803],
            [937.0011959742965, 814.9747953039692, 1.0631148759734803, 1.0631148759734803],
            [499.9973068437332, 812.8045387740534, 1.0631148759734803, 1.0631148759734803],
            [528.2239328677365, 391.2913373023275, 1.0631148759734803, 1.0631148759734803],
            [528.2239328677365, 251.336730719206, 1.0631148759734803, 1.0631148759734803],
            [534.4999999999999, 189.27753855695565, 1.0631148759734803, 1.0631148759734803],
            [534.4999999999999, 349.42776644548667, 1.0631148759734803, 1.0631148759734803],
            [1126.3445867825194, 288.6702566735936, 1.0631148759734803, 1.0631148759734803],
            [1244.1870206372046, 303.6684126343498, 1.0631148759734803, 1.0631148759734803],
            [1149.0949000093824, 457.29327531359655, 1.0631148759734803, 1.0631148759734803]],

            //110
            S: [[869.5312649135285, 741.2836644851309, 0.9970687951186153, 0.9970687951186153],
            [1361.9243083601311, 722.3010605928858, 0.9970687951186153, 0.9970687951186153],
            [34.789089213906664, 324.2206442891829, 0.9970687951186153, 0.9970687951186153],
            [466.7907559841485, 320.6759830921782, 0.9970687951186153, 0.9970687951186153],
            [377.69787802504743, 514.4861854264782, 0.9970687951186153, 0.9970687951186153],
            [355.69787802504743, 459.543412671807, 0.9970687951186153, 0.9970687951186153],
            [375.0000000000007, 393.57473392055795, 0.9970687951186153, 0.9970687951186153],
            [399.0000000000007, 610.3869566239343, 0.9970687951186153, 0.9970687951186153],
            [226.35735080707184, 501.49715051961107, 0.9970687951186153, 0.9970687951186153],
            [312.56824102350447, 515.788296815416, 0.9970687951186153, 0.9970687951186153],
            [86.65724765366838, 464.6396282124931, 0.9970687951186153, 0.9970687951186153]],

            //100
            SS: [[897.3088808414254, 714.8772456569252, 1.019331676670684, 1.019331676670684],
            [1364.6755706679091, 709.68409083083, 1.019331676670684, 1.019331676670684],
            [97.56179280691248, 302.8650331438324, 1.019331676670684, 1.019331676670684],
            [511.56957106804043, 301.8748272411623, 1.019331676670684, 1.019331676670684],
            [395.9137616046969, 418.88434197637173, 1.019331676670684, 1.019331676670684],
            [392.9746598534005, 363.87034459704535, 1.019331676670684, 1.019331676670684],
            [447.5000000000007, 598.5000146754867, 1.019331676670684, 1.019331676670684],
            [430.83333206176826, 515.510858236212, 1.019331676670684, 1.019331676670684],
            [365.4646907162851, 481.7929297228258, 1.019331676670684, 1.019331676670684],
            [280.0167349379735, 495.7747245444168, 1.019331676670684, 1.019331676670684],
            [138.11558958907153, 436.82231386613455, 1.019331676670684, 1.019331676670684]],
        }
    },

    SHIRTS: {
        MEN: {
            LL: [[522.678344415861, 1165.998890696827, 0.9529616724738676, 0.9529616724738676],
            [1286.0575486940388, 1803.432370232326, 0.9529616724738676, 0.9529616724738676],
            [9.758703375711661, 1803.432370232326, 0.9529616724738676, 0.9529616724738676],
            [619.046463067051, 1997.0039762851743, 0.9529616724738676, 0.9529616724738676],
            [584.7980683771661, 1584.0326795047745, 0.9529616724738676, 0.9529616724738676],
            [9.019876637449414, 1948.6251914809677, 0.9529616724738676, 0.9529616724738676],
            [1284.5582272043725, 1966.6239638037218, 0.9529616724738676, 0.9529616724738676],
            [165.82380247556932, 422.99968219456406, 0.9529616724738676, 0.9529616724738676]],

            L: [[536.2559071532305, 1147.6636771866522, 0.9634150731851181, 0.9634150731851181],
            [1305.466563796448, 1733.8718761144632, 0.9634150731851181, 0.9634150731851181],
            [-14.816157514253803, 1104.059445825087, 0.9634150731851181, 0.9634150731851181],
            [686.8923364793831, 1540.7390561414206, 0.9634150731851181, 0.9634150731851181],
            [-3.115992201529224, 1494.5144398588889, 0.9634150731851181, 0.9634150731851181],
            [26.644615997039864, 1675.8044040581653, 0.9634150731851181, 0.9634150731851181],
            [627.2269723688718, 1675.803918704233, 0.9634150731851181, 0.9634150731851181],
            [1505.000269532303, 533.7984571238748, 0.9634150731851181, 0.9634150731851181]],

            M: [[498.09524135562674, 1128.378147737829, 0.9637557960332351, 0.9637557960332351],
            [1323.8927779373744, 1094.8102770371765, 0.9637557960332351, 0.9637557960332351],
            [-32.11055523710189, 1094.8102770371765, 0.9637557960332351, 0.9637557960332351],
            [1248.4894603486302, 1453.7536695088565, 0.9637557960332351, 0.9637557960332351],
            [-17.64788974979865, 1498.7408298865137, 0.9637557960332351, 0.9637557960332351],
            [814.2864812325689, 1474.7535458034374, 0.9637557960332351, 0.9637557960332351],
            [691.2864812325689, 1246.7917570498914, 0.9637557960332351, 0.9637557960332351],
            [645.7630662020906, 1493.7507091606876, 0.9637557960332351, 0.9637557960332351]],

            S: [[501, 1074.3133617122312, 0.8759797358234079, 0.8759797358234079],
            [1350, 1053.4777028477058, 0.899270312764109, 0.899270312764109],
            [-17, 1049.7134506386828, 0.899270312764109, 0.899270312764109],
            [1297, 1420.8614976239896, 0.8942210709086563, 0.8942210709086563],
            [9, 1421.6055222191378, 0.8942210709086563, 0.8942210709086563],
            [786, 1409.618290043215, 0.956407940055981, 0.956407940055981],
            [726, 1218.6681098669214, 0.956407940055981, 0.956407940055981],
            [622.0000000000041, 1454.5949732003671, 0.9506600935828659, 0.9506600935828659]],

            //new
            SS: [[584.7777189501685, 1080.114374732745, 0.9744298411102414, 0.9744298411102414],
            [1359.9369748646354, 1043.4087662086172, 0.9744298411102414, 0.9744298411102414],
            [-76.06854308957253, 1043.4087662086172, 0.9744298411102414, 0.9744298411102414],
            [-42.4134341016636, 1389.9388185028365, 0.9744298411102414, 0.9744298411102414],
            [1262.5487872473468, 1394.92884598402, 0.9744298411102414, 0.9744298411102414],
            [718.6489519729305, 1193.1154712101822, 0.9744298411102414, 0.9744298411102414],
            [716.6489441902024, 1336.0376749386928, 0.9744298411102414, 0.9744298411102414],
            [537.5000050365928, 947.5229267850866, 0.9744298411102414, 0.9744298411102414]],
        },

        LADIES: {
            LL: [[557.0383275261324, 1008.4079560789972, 0.9529616724738676, 0.9529616724738676],
            [1312.178571447198, 1521.0698094140296, 0.9529616724738676, 0.9529616724738676],
            [8.428571428571445, 956.1164962843711, 0.9529616724738676, 0.9529616724738676],
            [1374.588850174216, 660.2444889144725, 0.9529616724738676, 0.9529616724738676],
            [827.5888501742161, 1383.1851883984598, 0.9529616724738676, 0.9529616724738676],
            [132.05574912891984, 1122.3604937581033, 0.9529616724738676, 0.9529616724738676],
            [129.31358885017426, 1278.8626585802501, 0.9529616724738676, 0.9529616724738676],
            [733.7595818815331, 1488.891679839771, 0.9529616724738676, 0.9529616724738676]],

            L: [[512.5082088140408, 995.4068704464215, 0.9699622222855379, 0.9699622222855379],
            [1325.257481848958, 964.8673971266289, 0.9699622222855379, 0.9699622222855379],
            [-12.742498272893442, 964.8673971266289, 0.9699622222855379, 0.9699622222855379],
            [-6.695594913059892, 1298.324316157184, 0.9699622222855379, 0.9699622222855379],
            [1384.2935074378154, 1296.3253556707884, 0.9699622222855379, 0.9699622222855379],
            [802.9771365181527, 1125.8475469454222, 0.9699622222855379, 0.9699622222855379],
            [793.9408364299784, 1265.828371315899, 0.9699622222855379, 0.9699622222855379],
            [559.4999999999975, 1231.8331312239366, 0.9699622222855379, 0.9699622222855379]],

            M: [[482.09446166262273, 972.1083473568503, 0.95311566698168, 0.95311566698168],
            [1344.7373889979922, 944.2001109587665, 0.95311566698168, 0.95311566698168],
            [-22.26259113876023, 944.2001109587665, 0.95311566698168, 0.95311566698168],
            [-15.960453917844973, 1257.1714915036366, 0.95311566698168, 0.95311566698168],
            [1403.0071811620114, 1257.1728082574657, 0.95311566698168, 0.95311566698168],
            [837.4999999999994, 1097.279077278543, 0.95311566698168, 0.95311566698168],
            [831.4999999999994, 1238.1836126259298, 0.95311566698168, 0.95311566698168],
            [530.944441638042, 1203.6907447629626, 0.95311566698168, 0.95311566698168]],

            S: [[455.94870027489543, 950.0700128608308, 0.9536771075403067, 0.9536771075403067],
            [1353.4480038119377, 937.5175397509225, 0.9536771075403067, 0.9536771075403067],
            [-30.55197596718739, 937.5175397509225, 0.9536771075403067, 0.9536771075403067],
            [-29.330227411633643, 1224.4904448670088, 0.9536771075403067, 0.9536771075403067],
            [1414.628655084458, 1224.49270950792, 0.9536771075403067, 0.9536771075403067],
            [866, 1062.5641656416565, 0.9536771075403067, 0.9536771075403067],
            [857, 1205.5649856498565, 0.9536771075403067, 0.9536771075403067],
            [526.463659090733, 1154.1414940154464, 0.9536771075403067, 0.9536771075403067]],

            SS: [[632.4782896311337, 929.0593707493207, 0.9818649999999951, 0.9818649999999951],
            [1371.628004953458, 905.2285684005759, 0.9818649999999951, 0.9818649999999951],
            [-63.60750269335324, 905.2285684005759, 0.9818649999999951, 0.9818649999999951],
            [1403.2367994042525, 1193.8555252038382, 0.9818649999999951, 0.9818649999999951],
            [-32.82492331460338, 1194.8524577141372, 0.9818649999999951, 0.9818649999999951],
            [888.7437653675232, 1043.8752810590256, 0.9818649999999951, 0.9818649999999951],
            [887.7113015447461, 1183.8601017871936, 0.9818649999999951, 0.9818649999999951],
            [602.5000000000008, 1144.4787090078364, 0.9818649999999951, 0.9818649999999951]],
        },

        KID: {
            //140
            LL: [[784.0452961672474, 898.9600923170483, 0.9529616724738676, 0.9529616724738676],
            [1428.7247386759582, 866.5937037595156, 0.9529616724738676, 0.9529616724738676],
            [351.7247386759582, 866.5937037595156, 0.9529616724738676, 0.9529616724738676],
            [1435.3379790940767, 1131.1324965902586, 0.9529616724738676, 0.9529616724738676],
            [8.337979094076672, 1118.4018912801496, 0.9529616724738676, 0.9529616724738676],
            [485.79790940766554, 996.1882813791115, 0.9529616724738676, 0.9529616724738676],
            [483.79790940766554, 1130.1882813791115, 0.9529616724738676, 0.9529616724738676],
            [94.69686411149826, 721.8770679406085, 0.9529616724738676, 0.9529616724738676]],

            //130
            L: [[823.7503381801978, 863.9195458873286, 0.9531920431528258, 0.9531920431528258],
            [1440.6415858615787, 838.9901009077522, 0.9531920431528258, 0.9531920431528258],
            [419.0416102756408, 991.9371870444318, 0.9531920431528258, 0.9531920431528258],
            [1.9611322329818393, 976.9382011789312, 0.9531920431528258, 0.9531920431528258],
            [1.9611322329818393, 352.97781580782134, 0.9531920431528258, 0.9531920431528258],
            [1418.9999999999989, 975.9384547125713, 0.9531920431528258, 0.9531920431528258],
            [931.9999999999989, 979.9375673448842, 0.9531920431528258, 0.9531920431528258],
            [143.69116663674706, 684.339417787669, 0.9531920431528258, 0.9531920431528258]],

            //120
            M: [[387.42452821254994, 833.8788051874535, 0.9366435385132015, 0.9366435385132015],
            [986.6000061035153, 813.3961601255406, 0.9366435385132015, 0.9366435385132015],
            [-4.399993896484602, 813.3961601255406, 0.9366435385132015, 0.9366435385132015],
            [1459.827659518347, 346.11956840377127, 0.9366435385132015, 0.9366435385132015],
            [1459.796535665044, 580.9046987015529, 0.9366435385132015, 0.9366435385132015],
            [1392.9442950604716, 907.178643351837, 0.9366435385132015, 0.9366435385132015],
            [870.942075075814, 915.1595420344379, 0.9366435385132015, 0.9366435385132015],
            [1747.0000000000018, 758.3123525736312, 0.8757442408703265, 0.8757442408703265]],

            //110
            S: [[447.8894369679149, 795.0797526414741, 0.9666183820637266, 0.9666183820637266],
            [1044.6941565467184, 779.7524229390261, 0.9666183820637266, 0.9666183820637266],
            [64.69415653181647, 779.7524229390261, 0.9666183820637266, 0.9666183820637266],
            [1457.8542013470744, 335.39563217852935, 0.9666183820637266, 0.9666183820637266],
            [1457.7971537525852, 546.7266933463143, 0.9666183820637266, 0.9666183820637266],
            [1424.500000000001, 663.0052709766363, 0.9666183820637266, 0.9666183820637266],
            [1424.500000000001, 793.6991782258517, 0.9666183820637266, 0.9666183820637266],
            [-3.13322940241882, 764.1579267488875, 0.9666183820637266, 0.9666183820637266]],

            //100
            SS: [[337.26946710603283, 758.973810239941, 0.964117017627794, 0.964117017627794],
            [921.5875892358866, 743.1941616504228, 0.964117017627794, 0.964117017627794],
            [-34.41241076411393, 743.1941616504228, 0.964117017627794, 0.964117017627794],
            [1469.6211047346887, 321.8264397071749, 0.964117017627794, 0.964117017627794],
            [1460.5564992797804, 523.1565238536289, 0.964117017627794, 0.964117017627794],
            [1435.0000000000005, 624.0765671981782, 0.964117017627794, 0.964117017627794],
            [1426.7614077163003, 754.5515059578397, 0.964117017627794, 0.964117017627794],
            [1345.0903190480415, 291.7023595017197, 0.964117017627794, 0.964117017627794]],
        }
    },

    HOODIE: {
        MEN: {
            LL: [[76.00000000000028, 124.49999999999977, 1.4501779359430604, 1.4501779359430604],
            [916.0000015258788, 887.0000052765873, 1.4501779359430604, 1.4501779359430604],
            [77.5, 1982.5, 1.4501779359430604, 1.4501779359430604],
            [1438, 1168, 1.4501779359430604, 1.4501779359430604],
            [816, 2457, 1.4501779359430604, 1.4501779359430604],
            [1439, 1706, 1.4501779359430604, 1.4501779359430604],
            [943, 1982, 1.4501779359430604, 1.4501779359430604],
            [93.5, 1167, 1.4501779359430604, 1.4501779359430604],
            [1334, 2302.5, 1.4501779359430604, 1.4501779359430604],
            [1595, 2281.5, 1.4501779359430604, 1.4501779359430604],
            [375.5, 1164, 1.4501779359430604, 1.4501779359430604],
            [1103.5, 126.5, 1.4501779359430604, 1.4501779359430604],
            [671.5, 955, 1.4501779359430604, 1.4501779359430604]],

            L: [[293.197481744309, 1047.525319465384, 1.7486432938292116, 1.7486432938292116],
            [742.0344574308814, 993.0000137686727, 1.7486432938292116, 1.7486432938292116],
            [1082.846353311302, 1757.7109183803357, 1.7486432938292116, 1.7486432938292116],
            [27.953987361917655, 2189.1561087537416, 1.7486432938292116, 1.7486432938292116],
            [30.452884111949345, 1664.8545075496593, 1.7486432938292116, 1.7486432938292116],
            [446.22340811856213, 2058.7056139771034, 1.7486432938292116, 1.7486432938292116],
            [1349.2247391329324, 1093.5702898591246, 1.7486432938292116, 1.7486432938292116],
            [50.967777986519906, 1024.077470006025, 1.7486432938292116, 1.7486432938292116],
            [808.0496462485692, 53.94441330285633, 1.7486432938292116, 1.7486432938292116],
            [877.0115841246661, 2086.176137584568, 1.7486432938292116, 1.7486432938292116],
            [1562.1337210105546, 57.44290169298233, 1.7486432938292116, 1.7486432938292116],
            [890.4111883775588, 20.903599836267745, 1.7486432938292116, 1.7486432938292116],
            [-21.085729636938254, 11.407378860951894, 1.7486432938292116, 1.7486432938292116]],

            M: [[18.15628906149709, 40.89145829945687, 1.6055150137290262, 1.6055150137290262],
            [786.030765563287, 2537.261130282899, 1.6055150137290262, 1.6055150137290262],
            [1138.4035191935327, 1607.797564123411, 1.6055150137290262, 1.6055150137290262],
            [765.020920583035, 1896.2893468724826, 1.6055150137290262, 1.6055150137290262],
            [43.1988686010863, 1499.3133339946783, 1.6055150137290262, 1.6055150137290262],
            [73.19148486589748, 2049.2801024651894, 1.6055150137290262, 1.6055150137290262],
            [1410.8619241519689, 1100.3374419587965, 1.6055150137290262, 1.6055150137290262],
            [62.70576008726246, 883.3474718386067, 1.6055150137290262, 1.6055150137290262],
            [482.56079275305524, 1027.3303122851983, 1.6055150137290262, 1.6055150137290262],
            [1005.4320696362631, 74.38789346265759, 1.6055150137290262, 1.6055150137290262],
            [500.59795755350535, 1754.294845180089, 1.6055150137290262, 1.6055150137290262],
            [1095.4136102982907, 63.890854089829645, 1.6055150137290262, 1.6055150137290262],
            [635.5231357035922, 807.3436048969936, 1.6055150137290262, 1.6055150137290262]],

            S: [[-40.830174090656556, 61.602928887328744, 1.5662850879226613, 1.5662850879226613],
            [446.11174052585795, 2351.095173520123, 1.5662850879226613, 1.5662850879226613],
            [1156.3983505789004, 1480.8780703995546, 1.5662850879226613, 1.5662850879226613],
            [1451.8518330472102, 996.7081167588915, 1.5662850879226613, 1.5662850879226613],
            [756.023381828098, 828.7951619525626, 1.5662850879226613, 1.5662850879226613],
            [45.198376352073524, 1872.254238249034, 1.5662850879226613, 1.5662850879226613],
            [654.0482404032334, 1869.2557926274926, 1.5662850879226613, 1.5662850879226613],
            [1586.3306663396684, 71.1614771425958, 1.5662850879226613, 1.5662850879226613],
            [907.497784879443, 71.1614771425958, 1.5662850879226613, 1.5662850879226613],
            [62.70576008726201, 990.6848010820152, 1.5662850879226613, 1.5662850879226613],
            [949.4874476501782, 1345.5008662977693, 1.5662850879226613, 1.5662850879226613],
            [139.64521345871373, 994.1101909160113, 1.5662850879226613, 1.5662850879226613],
            [985.4369921263888, 92.07805883199376, 1.5662850879226613, 1.5662850879226613]],

            //new
            SS: [[-63.322997655403015, 7.241386509653353, 1.5519055164344346, 1.5519055164344346],
            [991.9759657147306, 2251.834576799238, 1.5519055164344346, 1.5519055164344346],
            [9.18149897561608, 906.817149231573, 1.5519055164344346, 1.5519055164344346],
            [1428.8578102392298, 975.3564084692796, 1.5519055164344346, 1.5519055164344346],
            [41.201801655459064, 1783.9736708706075, 1.5519055164344346, 1.5519055164344346],
            [588.0650353576646, 1749.9899268634817, 1.5519055164344346, 1.5519055164344346],
            [1194.9165672410243, 1779.970567697237, 1.5519055164344346, 1.5519055164344346],
            [1588.330447460857, 69.76140494861608, 1.5519055164344346, 1.5519055164344346],
            [892.0017227802182, 75.2589178237775, 1.5519055164344346, 1.5519055164344346],
            [680.0547290967309, 726.9471852545432, 1.5519055164344346, 1.5519055164344346],
            [1591.3296973714723, 1501.0767407781516, 1.5519055164344346, 1.5519055164344346],
            [708.5053090223689, 915.7897707826278, 1.5519055164344346, 1.5519055164344346],
            [993.4354800491019, 49.699770985062514, 1.5519055164344346, 1.5519055164344346]],
        },

        LADIES: {
            LL: [[0, 0, 0, 0]],

            L: [[0, 0, 0, 0]],

            M: [[0, 0, 0, 0]],

            S: [[0, 0, 0, 0]],

            SS: [[0, 0, 0, 0]],
        },

        KID: {
            //140
            LL: [[1196.2349999259695, 127.73277133673957, 0.8423974398907308, 0.8423974398907308],
            [948.4999992400408, 1728.8075827846956, 0.8423974398907308, 0.8423974398907308],
            [78.00000917911507, 126.82956813507303, 0.8423974398907308, 0.8423974398907308],
            [814.9999997615812, 981.5331049788604, 0.8423974398907308, 0.8423974398907308],
            [608.0000028312209, 1356.3697656032812, 0.8423974398907308, 0.8423974398907308],
            [1141.9999948590998, 1330.382464911302, 0.8423974398907308, 0.8423974398907308],
            [1546.9999888837337, 1345.3745825821857, 0.8423974398907308, 0.8423974398907308],
            [516.5000052601102, 808.0825884894248, 0.8423974398907308, 0.8423974398907308],
            [1464.9999911189082, 906.5396735864576, 0.8423974398907308, 0.8423974398907308],
            [1668.9999880790713, 830.5729545316159, 0.8423974398907308, 0.8423974398907308],
            [1165.4999955743558, 796.0874054683293, 0.8423974398907308, 0.8423974398907308],
            [631.5000007301567, 129.2879669536252, 0.8423974398907308, 0.8423974398907308],
            [78.50000898539986, 882.9586607594274, 0.8423974398907308, 0.8423974398907308]],

            //130
            L: [[1174.9999913126233, 96.50000426173199, 0.9124646337394209, 0.9124646337394209],
            [870.5000015172957, 1422.4999910593033, 0.9124646337394209, 0.9124646337394209],
            [695.0000000149009, 70.00000508129574, 0.9124646337394209, 0.9124646337394209],
            [107.38557951591184, 1163.6261178875488, 0.9124646337394209, 0.9124646337394209],
            [1095.8349897460723, 1149.6352688483425, 0.9124646337394209, 0.9124646337394209],
            [1426.6510894294056, 1159.6287324477755, 0.9124646337394209, 0.9124646337394209],
            [1533.5916412907848, 784.8738474690501, 0.9124646337394209, 0.9124646337394209],
            [873.497777639678, 786.3313608653633, 0.9124646337394209, 0.9124646337394209],
            [63.40891429929505, 90.32812730847974, 0.9124646337394209, 0.9124646337394209],
            [65.40780311913392, 748.8973785110926, 0.9124646337394209, 0.9124646337394209],
            [1159.3388788766365, 690.3941103108097, 0.9124646337394209, 0.9124646337394209],
            [417.5000039190055, 717.4999940693381, 0.9124646337394209, 0.9124646337394209],
            [152.50000789761486, 59.50000387430168, 0.9124646337394209, 0.9124646337394209]],

            //120
            M: [[723.0000360107446, 57.223180279374276, 0.8959640941765351, 0.8959640941765351],
            [1645.5, 1338.046069680303, 0.8959640941765351, 0.8959640941765351],
            [1380.000065185551, 51.726942409250455, 0.8959640941765351, 0.8959640941765351],
            [126.99998626708893, 1055.5578833404227, 0.8959640941765351, 0.8959640941765351],
            [1058.5000372924828, 1060.5571925163417, 0.8959640941765351, 0.8959640941765351],
            [1546.5000670776408, 776.6156509964223, 0.8959640941765351, 0.8959640941765351],
            [1151.000048767093, 695.631985639116, 0.8959640941765351, 0.8959640941765351],
            [541.5000056152347, 49.25230956458765, 0.8959640941765351, 0.8959640941765351],
            [67.99997229003691, 56.75060854689406, 0.8959640941765351, 0.8959640941765351],
            [69.99997241210721, 674.6233996008035, 0.8959640941765351, 0.8959640941765351],
            [856.5000248413102, 736.1108976779141, 0.8959640941765351, 0.8959640941765351],
            [134.49999078369046, 5.218514340847719, 0.8959640941765351, 0.8959640941765351],
            [426.5000273437514, 607.095094674606, 0.8959640941765351, 0.8959640941765351]],

            //110
            S: [[724, 27.22000625002306, 0.8936282436207303, 0.8936282436207303],
            [135.5, 1246.0392808929976, 0.8936282436207303, 0.8936282436207303],
            [1387, 9.727331858037473, 0.8936282436207303, 0.8936282436207303],
            [550, 548.6460633941258, 0.8936282436207303, 0.8936282436207303],
            [54, 780.5929527360203, 0.8936282436207303, 0.8936282436207303],
            [550, 932.5581560979509, 0.8936282436207303, 0.8936282436207303],
            [1549, 694.6126403075593, 0.8936282436207303, 0.8936282436207303],
            [544.5, 42.24747728007759, 0.8936282436207303, 0.8936282436207303],
            [66, 35.748850831579944, 0.8936282436207303, 0.8936282436207303],
            [907, 679.6014229702869, 0.8936282436207303, 0.8936282436207303],
            [357.5, 749.0856271280059, 0.8936282436207303, 0.8936282436207303],
            [1088.5, 473.1009651197862, 0.8936282436207303, 0.8936282436207303],
            [132.5, -63.77564417021847, 0.8936282436207303, 0.8936282436207303]],

            //100
            SS: [[776.9999972134823, 3.2952249461700944, 0.8765879927214062, 0.8765879927214062],
            [1311.4999937415128, 563.2152011668685, 0.8765879927214062, 0.8765879927214062],
            [1406.999989375472, 24.790736629664707, 0.8765879927214062, 0.8765879927214062],
            [53.000011146068175, 728.467723739515, 0.8765879927214062, 0.8765879927214062],
            [522.5000041276215, 843.3963076782738, 0.8765879927214062, 0.8765879927214062],
            [868.4999989718198, 653.5143187812058, 0.8765879927214062, 0.8765879927214062],
            [575.0000033676622, 494.6130637294418, 0.8765879927214062, 0.8765879927214062],
            [418.0000057071444, 22.906228153567497, 0.8765879927214062, 0.8765879927214062],
            [360.0000075697899, 563.5305672174534, 0.8765879927214062, 0.8765879927214062],
            [1640.9999884814029, 604.5051016636629, 0.8765879927214062, 0.8765879927214062],
            [593.0000030994413, 26.90374370929527, 0.8765879927214062, 0.8765879927214062],
            [1117.499993517995, 405.99899010146123, 0.8765879927214062, 0.8765879927214062],
            [34.500009641051065, -93.68926484450662, 0.8765879927214062, 0.8765879927214062]],
        }
    },
}

export const SIZE_MODEL_PATTERN = {
    POLO: {
        MEN: { Width: 547, Height: 406 },
        LADIES: { Width: 547, Height: 340 },
        KID: { Width: 547, Height: 280 },
    },

    SHIRTS: {
        MEN: { Width: 547, Height: 547 },
        LADIES: { Width: 547, Height: 411 },
        KID: { Width: 547, Height: 297 },
    },

    HOODIE: {
        MEN: { Width: 871, Height: 550 },
        LADIES: { Width: 871, Height: 550 },
        KID: { Width: 506, Height: 550 },
    }
}

//#endregion

/*
    2023.01.12
    False:  Still follow the old flow (Paid and then approve the design)
    True:   Follow the new process B (Design approval and Paid)
*/
export const IS_HANDLE_FLOW_B = false;

/**
 * For Order.financial_status:"partially_paid": string
        The status of payments associated with the order. Can only be set when the order is created. Valid values:
    Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/order#[post]/admin/api/2021-10/orders.json
 */
export enum ENUM_ORDER_FINANCIAL_STATUS {
    /**
         * Pending: The payments are pending. Payment might fail in this state. Check again to confirm whether the payments have been paid successfully.
         * Financial status of "pending" refers to any order that does not have any 'transaction' property associated to it (e.g. the order was not paid for at all, no money was captured). This would typically be for an order that was directly made through the Admin API without any credit card transaction being made. Any order that comes from the Online Store and paid by credit card would not have this status.
         */
    PENDING = 'pending',

    /**
         * Authorized: The payments have been authorized.
         * Financial status of "authorized" means that the  authorization process first checked that the credit card is valid, and then that the card has enough funds on it for the transaction
         */
    AUTHORIZED = 'authorized',

    /**
         * Partially_paid: The order has been partially paid.
         * Financial status of "partially_paid" means to only a partial amount of the order was captured. This can happen if you have manual capture set-up on your store instead of automatic (https://help.shopify.com/en/manual/orders/get-paid), or if you are using Shopify POS and choose to accept partial payment. 
         */
    PARTIALLY_PAID = 'partially_paid',

    /**
         * Paid: The payments have been paid.
         * Financial status of "paid" means that the transaction was captured and full payment of the order was received. If automatic capture is set-up on your store, the order will go from status of "authorized" to "paid" in a manner of moments
         */
    PAID = 'paid',

    /**
         * Partially_refunded: The payments have been partially refunded.
         */
    PARTIALLY_REFUNDED = 'partially_refunded',

    /**
         * Refunded: The payments have been refunded.
         */
    REFUNDED = 'refunded',

    /**
         * Voided: The payments have been voided.
         */
    VOIDED = 'voided'
}

/**
 *  For Order.transaction.kind:"capture": string
 *  Transactions are created for every order that results in an exchange of money.
 *  Ref to: https://shopify.dev/api/admin-rest/2021-10/resources/transaction#[post]/admin/api/2021-10/orders/{order_id}/transactions.json
 */
export enum ENUM_ORDER_TRANSACTION_KIND {
    /**
     * Authorization: Money that the customer has agreed to pay. The authorization period can be between 7 and 30 days (depending on your payment service) while a store waits for a payment to be captured.
     */
    AUTHORIZATION = 'authorization',

    /**
     * Capture: A transfer of money that was reserved during the authorization of a shop.
     */
    CAPTURE = 'capture',

    /**
     * Sale: The authorization and capture of a payment performed in one single step.
     */
    SALE = 'sale',

    /**
     * Void: The cancellation of a pending authorization or capture.
     */
    VOID = 'void',

    /**
     * Refund: The partial or full return of captured money to the customer.
     */
    REFUND = 'refund'
}

/**
 *  For Order.transaction.status:"success": string
 *  Transactions are created for every order that results in an exchange of money.
 *  Ref to: https://shopify.dev/api/admin-rest/2021-07/resources/transaction#resource_object
 */
export enum ENUM_ORDER_TRANSACTION_STATUS {
    /**
     * Pending: 
     */
    PENDING = 'pending',

    /**
     * Failure: 
     */
    FAILURE = 'failure',

    /**
     * Success: 
     */
    SUCCESS = 'success',

    /**
     * Error: 
     */
    ERROR = 'error',
}