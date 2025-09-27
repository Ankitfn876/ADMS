
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://ankitfn876.github.io/ADMS/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/ADMS/home",
    "route": "/ADMS"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KFJUYKQN.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/ADMS/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JBKRC4CF.js",
      "chunk-HAGLRYDI.js",
      "chunk-KJN3ZNAC.js",
      "chunk-4MCWHOXR.js"
    ],
    "route": "/ADMS/login"
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
    "route": "/ADMS/forgetpassword"
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
    "route": "/ADMS/vregister"
  },
  {
    "renderMode": 2,
    "route": "/ADMS/Admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BAJWQUGB.js",
      "chunk-JESCSUX2.js"
    ],
    "route": "/ADMS/Admin/Dashboard"
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
    "route": "/ADMS/Admin/Registeremployee"
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
    "route": "/ADMS/Admin/Edit"
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
    "route": "/ADMS/Admin/AttendanceList"
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
    "route": "/ADMS/Admin/CreateEmployeeUser"
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
    "route": "/ADMS/Admin/Employeelist"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VRI4O2LS.js"
    ],
    "route": "/ADMS/Admin/DeleteEmployee"
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
    "route": "/ADMS/Admin/Updateprofile"
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
    "route": "/ADMS/Admin/listofemployee"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QCFUSMIP.js"
    ],
    "route": "/ADMS/Admin/Employeedashboard"
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
    "route": "/ADMS/Admin/Registerdesignation"
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
    "route": "/ADMS/Admin/Registerradius"
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
    "route": "/ADMS/Admin/Leavetype"
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
    "route": "/ADMS/Admin/Leave"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28621, hash: '43c760c3a3b141f9690aaf250c5c86aaeae05f356f4c51d0e8f49174a8c25ba8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17780, hash: '657aaaef8a8141ea55f2bdfe3c9aae3221bf8e79da5e6007999651e64a7e6702', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 36736, hash: '54682ff6bf80a653ea1e61d056c7f1be87b351b24a07304e2b036a9fa3e1d50d', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 58191, hash: '0b8c0c28343efa2eef9c109d654a3b688c229bb6255f3175757e675ed1d46482', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'Admin/index.html': {size: 36527, hash: 'feb4409df088f3a58c73b7e115f77c353424fe7c17f1f438d55ade928a0946ea', text: () => import('./assets-chunks/Admin_index_html.mjs').then(m => m.default)},
    'Admin/Dashboard/index.html': {size: 36632, hash: '96a07413e1af3f56b40416710d5198dba2edcd4bd02e70bb08127365d06b4a99', text: () => import('./assets-chunks/Admin_Dashboard_index_html.mjs').then(m => m.default)},
    'Admin/Edit/index.html': {size: 37048, hash: 'fe86e6348185606892615ec296f0d2ddb4bad94c0798b0cf91dc844cdb0765c1', text: () => import('./assets-chunks/Admin_Edit_index_html.mjs').then(m => m.default)},
    'Admin/Registeremployee/index.html': {size: 37048, hash: 'dc39a209441cb5ab6ca0df820520a85c4ffb4c2c25935a21b69fb66085b04eb6', text: () => import('./assets-chunks/Admin_Registeremployee_index_html.mjs').then(m => m.default)},
    'forgetpassword/index.html': {size: 92590, hash: '812e113f051d3c5f9db1707092ac1188da5f6274a3ccc0b2af40dd42784f821c', text: () => import('./assets-chunks/forgetpassword_index_html.mjs').then(m => m.default)},
    'Admin/AttendanceList/index.html': {size: 36944, hash: '05362570ec19098464d0b418298342b92975aa9776fbc9515ce2c77f009c96e7', text: () => import('./assets-chunks/Admin_AttendanceList_index_html.mjs').then(m => m.default)},
    'vregister/index.html': {size: 114859, hash: '0118d236e87b4201fc80df8aac2b015c77faf8a1af70a2e30537df703d968085', text: () => import('./assets-chunks/vregister_index_html.mjs').then(m => m.default)},
    'Admin/CreateEmployeeUser/index.html': {size: 37048, hash: '86b4a36a6f6c4c68cfaf7211ccfbe6b2dc0d087555fce23a6956cb65278393dc', text: () => import('./assets-chunks/Admin_CreateEmployeeUser_index_html.mjs').then(m => m.default)},
    'Admin/Employeelist/index.html': {size: 37049, hash: '3af4abdbda3f609aec61b5daca13fe6f7df3f9ace8c6dde8e6b5f2e35a7fbb78', text: () => import('./assets-chunks/Admin_Employeelist_index_html.mjs').then(m => m.default)},
    'Admin/DeleteEmployee/index.html': {size: 36580, hash: '8cd0619ed851a144b3c06306f86583047d8fef490b05b9e2c5b7938329a41672', text: () => import('./assets-chunks/Admin_DeleteEmployee_index_html.mjs').then(m => m.default)},
    'Admin/Employeedashboard/index.html': {size: 36581, hash: '2660b7ddafa3b5290993da171b22ceec7d19cf69d7c0297bb842eb91efcc7446', text: () => import('./assets-chunks/Admin_Employeedashboard_index_html.mjs').then(m => m.default)},
    'Admin/listofemployee/index.html': {size: 37048, hash: '7a3244ef5a6780632a1e90b773053b4516c4ea485b9e94f33c94b9bc6ff24d80', text: () => import('./assets-chunks/Admin_listofemployee_index_html.mjs').then(m => m.default)},
    'Admin/Leavetype/index.html': {size: 37048, hash: 'cb9a15c104e884636aac76d7d577c5693ba0dfefb437f5bcd6010730225c7403', text: () => import('./assets-chunks/Admin_Leavetype_index_html.mjs').then(m => m.default)},
    'Admin/Registerdesignation/index.html': {size: 37048, hash: '90e21419b17fabe9a605e62e050fdcc38f09c6bfe9f9a4a9cd71cd084ce5b517', text: () => import('./assets-chunks/Admin_Registerdesignation_index_html.mjs').then(m => m.default)},
    'Admin/Registerradius/index.html': {size: 37049, hash: '6958654943218ee30c2164d53c7dd6a4629576313e05cb33dbd58d264cf46c4a', text: () => import('./assets-chunks/Admin_Registerradius_index_html.mjs').then(m => m.default)},
    'Admin/Updateprofile/index.html': {size: 37049, hash: 'c534483b2fd6e2539e77e207f52c9b27e4bb12188af72186d1b531d443648b75', text: () => import('./assets-chunks/Admin_Updateprofile_index_html.mjs').then(m => m.default)},
    'Admin/Leave/index.html': {size: 37048, hash: 'ade0bf60baeb7923d946bfcda337ac4eca48d62a52178ab0ca3555707f96fab7', text: () => import('./assets-chunks/Admin_Leave_index_html.mjs').then(m => m.default)},
    'styles-TMIBS6IZ.css': {size: 331236, hash: 'TVm+7XW4LpM', text: () => import('./assets-chunks/styles-TMIBS6IZ_css.mjs').then(m => m.default)}
  },
};
