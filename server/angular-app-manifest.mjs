
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KFJUYKQN.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JBKRC4CF.js",
      "chunk-HAGLRYDI.js",
      "chunk-KJN3ZNAC.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IN62AND4.js",
      "chunk-HAGLRYDI.js",
      "chunk-VN3CQEPZ.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/forgetpassword"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LHRS5AUP.js",
      "chunk-F5X5MWHG.js",
      "chunk-6OI3HXX5.js",
      "chunk-HAGLRYDI.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js"
    ],
    "route": "/vregister"
  },
  {
    "renderMode": 2,
    "route": "/Admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BAJWQUGB.js",
      "chunk-JESCSUX2.js"
    ],
    "route": "/Admin/Dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CR6TPY2I.js",
      "chunk-ERT7VNRB.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js",
      "chunk-4MCWHOXR.js",
      "chunk-JESCSUX2.js"
    ],
    "route": "/Admin/Registeremployee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TY2KJON4.js",
      "chunk-RPPTX57Y.js",
      "chunk-LSJZMYIL.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/Admin/Edit"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QMLKVH5O.js",
      "chunk-F5X5MWHG.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/Admin/AttendanceList"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-D4SABP3X.js",
      "chunk-SDJBYPZS.js",
      "chunk-F5X5MWHG.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/Admin/CreateEmployeeUser"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NIWWNCKZ.js",
      "chunk-SDJBYPZS.js",
      "chunk-F5X5MWHG.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-RPPTX57Y.js",
      "chunk-LSJZMYIL.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js"
    ],
    "route": "/Admin/Employeelist"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VRI4O2LS.js"
    ],
    "route": "/Admin/DeleteEmployee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TAKX7J6W.js",
      "chunk-6OI3HXX5.js",
      "chunk-HAGLRYDI.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js"
    ],
    "route": "/Admin/Updateprofile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZAJGZWHL.js",
      "chunk-SDJBYPZS.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js",
      "chunk-4MCWHOXR.js",
      "chunk-JESCSUX2.js"
    ],
    "route": "/Admin/listofemployee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QCFUSMIP.js"
    ],
    "route": "/Admin/Employeedashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YXXJROZU.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js"
    ],
    "route": "/Admin/Registerdesignation"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IZC6I4GA.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js"
    ],
    "route": "/Admin/Registerradius"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BHQEIAAP.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js"
    ],
    "route": "/Admin/Leavetype"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SMAYZ3DH.js",
      "chunk-6OI3HXX5.js",
      "chunk-ERT7VNRB.js",
      "chunk-LSJZMYIL.js",
      "chunk-FJAA27VO.js",
      "chunk-VN3CQEPZ.js",
      "chunk-MS4AQ6UA.js",
      "chunk-QCPT7J6I.js",
      "chunk-BEDKTKCS.js",
      "chunk-KJN3ZNAC.js"
    ],
    "route": "/Admin/Leave"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28588, hash: '8a0236708fa7f2ca11d668246f2af94cc872e7b6dca12afbe088dcb0e522b01e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17747, hash: 'bf460ac9a39edaf34c69583f04c4d91ca2f07a642ad19e6d564cf6c1cbcc548b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 36703, hash: '03fa47abc124bcbfd94a6a8a5ccc410a46b527136c9a6b9ddcc3687ad1e71a18', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'forgetpassword/index.html': {size: 92557, hash: '9f2917197e83a281c205e13fca61d25f2711482d5e573fd4e5efb976ad57a648', text: () => import('./assets-chunks/forgetpassword_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 58158, hash: 'c46dc3cef091fe0babd59f3fe59ebb0674eff0b7b39eb6bed4d02a2cec92d806', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'Admin/index.html': {size: 36494, hash: '2dc6131cb1661ba132f651abbcdf9c397cba56cf84529920b13d81b22d3f5763', text: () => import('./assets-chunks/Admin_index_html.mjs').then(m => m.default)},
    'Admin/Registeremployee/index.html': {size: 37015, hash: 'a78f5f1ced7496d276e8ada73350d2b8e5e80580756b14c607291e575a94b8ac', text: () => import('./assets-chunks/Admin_Registeremployee_index_html.mjs').then(m => m.default)},
    'Admin/Dashboard/index.html': {size: 36600, hash: 'df9d1148c950b8c5b043b1d015d456ae67a1b3591ca922fc6d34ecc79ecd8c0d', text: () => import('./assets-chunks/Admin_Dashboard_index_html.mjs').then(m => m.default)},
    'Admin/Edit/index.html': {size: 37015, hash: '4181b6329b0e1b4e7650a284e557c47c1a146b8b76ca25a0243977cb42cab7f8', text: () => import('./assets-chunks/Admin_Edit_index_html.mjs').then(m => m.default)},
    'Admin/Employeelist/index.html': {size: 37015, hash: '80416d9f02ef16b1de3261a3601ddf686e8bdd3bd2a446b15feb38e54c1597e1', text: () => import('./assets-chunks/Admin_Employeelist_index_html.mjs').then(m => m.default)},
    'Admin/AttendanceList/index.html': {size: 36911, hash: '650941b3446cd8d5545bd046587827e6d5577b925afb2ddbd14936e160cbe8f3', text: () => import('./assets-chunks/Admin_AttendanceList_index_html.mjs').then(m => m.default)},
    'Admin/CreateEmployeeUser/index.html': {size: 37016, hash: 'c404872d39e1d5f654171c627b2048831ce20c0aabb4e9c27e53310873e3c9a2', text: () => import('./assets-chunks/Admin_CreateEmployeeUser_index_html.mjs').then(m => m.default)},
    'vregister/index.html': {size: 114826, hash: '72a8fd5e40be9976e9ca490eb55d50a2d79454f803d94ed01e51ccb9b996762f', text: () => import('./assets-chunks/vregister_index_html.mjs').then(m => m.default)},
    'Admin/DeleteEmployee/index.html': {size: 36547, hash: '0f61372d80b130b88ea3a4dae9c72a624a472b09e8ac97f2d40ed66188aa381f', text: () => import('./assets-chunks/Admin_DeleteEmployee_index_html.mjs').then(m => m.default)},
    'Admin/Updateprofile/index.html': {size: 37015, hash: '1b10819e29a04da559561e8e120f5524d7f25f932bc939930bc9aaed0bcc9bfc', text: () => import('./assets-chunks/Admin_Updateprofile_index_html.mjs').then(m => m.default)},
    'Admin/listofemployee/index.html': {size: 37016, hash: '63530e6c613351a371026641d3623cdf921382b70b224216a3d29938a0e01ae0', text: () => import('./assets-chunks/Admin_listofemployee_index_html.mjs').then(m => m.default)},
    'Admin/Employeedashboard/index.html': {size: 36548, hash: '2b557ea85389b09c8f7d6bd4490ad0f290e999bbb2044785699af4d7451a7d2d', text: () => import('./assets-chunks/Admin_Employeedashboard_index_html.mjs').then(m => m.default)},
    'Admin/Registerdesignation/index.html': {size: 37015, hash: '862c472364845b498d347c13f49bcee4917242f528f1bab0c840f4f4a42fd3c9', text: () => import('./assets-chunks/Admin_Registerdesignation_index_html.mjs').then(m => m.default)},
    'Admin/Registerradius/index.html': {size: 37015, hash: 'b7b0730f66f9979b390670776ed4fc32f5e494f4233bda2968708724dda5e254', text: () => import('./assets-chunks/Admin_Registerradius_index_html.mjs').then(m => m.default)},
    'Admin/Leavetype/index.html': {size: 37016, hash: 'c4c8aaa9a3fd6f169c4ca28840064462136b1f8ca65ee0c309f8500cef38868a', text: () => import('./assets-chunks/Admin_Leavetype_index_html.mjs').then(m => m.default)},
    'Admin/Leave/index.html': {size: 37016, hash: 'd9a563bfa94bd662d0fc53054129b7f0ff67c84c6b9c549b7792fe54c258aec0', text: () => import('./assets-chunks/Admin_Leave_index_html.mjs').then(m => m.default)},
    'styles-TMIBS6IZ.css': {size: 331236, hash: 'TVm+7XW4LpM', text: () => import('./assets-chunks/styles-TMIBS6IZ_css.mjs').then(m => m.default)}
  },
};
