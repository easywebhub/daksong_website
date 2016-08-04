const site = {
    port: 3000,        // cổng server local sẻ sử dụng
    contentRoot: './content', // thư mục chứa content file cho metalsmith
    buildRoot: './build',   // thư mục chứa output của metalsmith
    layoutRoot: './layout',  // thư mục layout của handlebars

    // thư mục chứa style của site, sẽ build vào ${buildRoot}/css/
    styleRoot: './style',

    // thư mục chứa style của site, sẽ build vào ${buildRoot}/js/
    scriptRoot: './script',

    // thư mục chứa các script, css, fonts, image của vendor
    // tât cả sẽ được copy (giữ nguyên câu trúc) qua ${buildRoot}
    // ở chế độ production cũng sẽ không minify
    assetRoot: './asset',

    //thư mục chứa tất các các file json chứa dữ liệu dùng chung, không định nghĩa được trong file .md
    //gồm 3 file json chính
    //global.json chứa thông tin chung về website
    //menu.json chứa thông tin về menu của website
    //footer.json chứa thông tin về footer của website
    metadataRoot: './content/metadata'



};

site.script = {
    concat: false,     // concat == true sẽ nhập các file script lại thành 1 file duy nhất
    concatName: 'app.js', // tên của file script sau khi nhập, mặc định là app.js
    files: [
        // ví dụ
        // "bower_components/jquery/dist/jquery.js",
        // "bower_components/what-input/what-input.js",
        // // Core Foundation files
        // "bower_components/foundation-sites/js/foundation.core.js",
        // "bower_components/foundation-sites/js/foundation.util.*.js",

        // thêm các file script của site ở đây
        // muốn concat đúng thứ tự thì phải define path
        `${site.scriptRoot}/!(app).js` // các file có tên khác 'app.js'
    ]
};

site.style = {
    sass: {
        // đường dẫn tơi các thư viện sass, có thể load bằng @import
        includePaths: [
            'bower_components'
            // ví dụ
            // 'bower_components/foundation-sites/scss',
            // "bower_components/motion-ui/src",
            // "bower_components/SpinKit/scss"
        ]
    },
    autoprefixer: {
        browsers: ['last 2 versions', 'IE >= 9']
    }
};

// define và config các plugin của metalsmith
site.metalsmith = {
    'metalsmith-metadata-directory': {
        'directory': `${site.metadataRoot}/**/*.json`
    },

    'metalsmith-drafts': {
        '_enable': false
    },
    'metalsmith-matters': {
        '_enable': true,
        'delims': ['---json', '---'],
        'options': {
            'lang': 'json'
        }
    },

    'metalsmith-markdown': {
        '_enable': true,
        'smartypants': true,
        'smartLists': true,
        'gfm': true,
        'tables': true
    },

    'metalsmith-collections': {
        '_enable': true,

        'tinKinhTe': {
            'pattern': 'tin-kinh-te/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'thongTinChiDaoDieuHanh': {
            'pattern': 'thong_tin_chi_dao_dieu_hanh/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'tinVanHoa': {
            'pattern': 'tin_van_hoa/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'tinNoiBat': {
            'pattern': 'tin_noi_bat/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'lichLamViec': {
            'pattern': 'lich_lam_viec/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'keHoachPhatTrien': {
            'pattern': 'ke_hoach_phat_trien/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'vanBanPhapLuat': {
            'pattern': 'van_ban_phap_luat/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },

        'hoatDongCuaLanhDao': {
            'pattern': 'hoat_dong_cua_lanh_dao/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        // collection theo key trong metadata `"collection": "baiviet"`
        'baiviet': {
            'sortBy': 'date',
            'reverse': true
        },
        'tinAnNinhTratTu': {
            'pattern': 'tin_an_ninh_trat_tu/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
         'huongDan': {
            'pattern': 'huong_dan/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'chinhSach': {
            'pattern': 'chinh_sach/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
         'tinAnToanGiaoThong': {
            'pattern': 'tin_an_toan_giao_thong/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
         'khenThuongXuPhat': {
            'pattern': 'khen_thuong_xu_phat/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
         'tinYTeGiaoDuc': {
            'pattern': 'tin_y_te_giao_duc/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        }

    },



    'metalsmith-pagination': {
        '_enable': true,

        'collections.tinAnNinhTratTu': {
            'perPage': 5,
            'layout': 'tin_an_ninh_trat_tu.html',
            'first': 'tin_an_ninh_trat_tu/index.html',
            'path': 'tin_an_ninh_trat_tu/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Tin an ninh trực tự'
            }

        },

        'collections.tinKinhTe': {
            'perPage': 5,
            'layout': 'tin-kinh-te.html',
            'first': 'tin-kinh-te/index.html',
            'path': 'tin-kinh-te/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Tin kinh tế'
            }

        },
        'collections.thongTinChiDaoDieuHanh': {
            'perPage': 5,
            'layout': 'thong_tin_chi_dao_dieu_hanh.html',
            'first': 'thong_tin_chi_dao_dieu_hanh/index.html',
            'path': 'thong_tin_chi_dao_dieu_hanh/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Chỉ đạo điều hành'
            }
        },
        'collections.tinVanHoa': {
            'perPage': 5,
            'layout': 'tin_van_hoa.html',
            'first': 'tin_van_hoa/index.html',
            'path': 'tin_van_hoa/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'tin van hoa'
            }

        },
        'collections.tinNoiBat': {
            'perPage': 5,
            'layout': 'tin_noi_bat.html',
            'first': 'tin_noi_bat/index.html',
            'path': 'tin_noi_bat/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Tin nổi bật'
            }

        },
        'collections.lichLamViec': {
            'perPage': 5,
            'layout': 'lich_lam_viec.html',
            'first': 'lich_lam_viec/index.html',
            'path': 'lich_lam_viec/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Lịch làm việc'
            }

        },
        'collections.keHoachPhatTrien': {
            'perPage': 5,
            'layout': 'ke_hoach_phat_trien.html',
            'first': 'ke_hoach_phat_trien/index.html',
            'path': 'ke_hoach_phat_trien/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Kế hoạch phát triển'
            }

        },
        'collections.hoatDongCuaLanhDao': {
            'perPage': 5,
            'layout': 'hoat_dong_cua_lanh_dao.html',
            'first': 'hoat_dong_cua_lanh_dao/index.html',
            'path': 'hoat_dong_cua_lanh_dao/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Hoạt động của lãnh đạo'
            }

        },
        'collections.huongDan': {
            'perPage': 5,
            'layout': 'huong_dan.html',
            'first': 'huong_dan/index.html',
            'path': 'huong_dan/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Hướng dẫn'
            }

        },
        'collections.vanBanPhapLuat': {
            'perPage': 5,
            'layout': 'van_ban_phap_luat.html',
            'first': 'van_ban_phap_luat/index.html',
            'path': 'van_ban_phap_luat/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Văn bản pháp luật'
            }

        },
         'collections.chinhSach': {
            'perPage': 5,
            'layout': 'chinh_sach.html',
            'first': 'chinh_sach/index.html',
            'path': 'chinh_sach/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Chinh sách'
            }

        },
        'collections.tinAnToanGiaoThong': {
            'perPage': 5,
            'layout': 'tin_an_toan_giao_thong.html',
            'first': 'tin_an_toan_giao_thong/index.html',
            'path': 'tin_an_toan_giao_thong/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'tin an toàn giao thông'
            }

        },
        'collections.khenThuongXuPhat': {
            'perPage': 5,
            'layout': 'khen_thuong_xu_phat.html',
            'first': 'khen_thuong_xu_phat/index.html',
            'path': 'khen_thuong_xu_phat/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'khen thưởng xử phạt'
            }

        },
        'collections.tinYTeGiaoDuc': {
            'perPage': 5,
            'layout': 'tin_y_te_giao_duc.html',
            'first': 'tin_y_te_giao_duc/index.html',
            'path': 'tin_y_te_giao_duc/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'tin y tế giáo dục'
            }

        },



        // // test filter
        // 'collections.baiviet': {
        //     'perPage':   1,
        //     'layout':    'blog.html',
        //     'first':     'baiviet/index.html',
        //     'path':      'baiviet/:num/index.html',
        //     'filter':    meta => {
        //         return meta.dacbiet === false;
        //     },
        //     'noPageOne': true
        // }
    },

    'metalsmith-permalinks': {
        '_enable': true,
        // default config
        'pattern': ':url',
        'relative': false,
        // config rieng cho 1 collection
        linksets: [{
            match: { collection: 'blog' },
            pattern: 'blog/:url'
        },
            {
                match: { collection: 'tinKinhTe' },
                pattern: 'tin-kinh-te/:url'
            },
            {
                match: { collection: 'thongTinChiDaoDieuHanh' },
                pattern: 'thong_tin_chi_dao_dieu_hanh/:url'
            },
            {
                match: { collection: 'tinVanHoa' },
                pattern: 'tin_van_hoa/:url'
            },
            {
                match: { collection: 'tinNoiBat' },
                pattern: 'tin_noi_bat/:url'
            },
            {
                match: { collection: 'lichLamViec' },
                pattern: 'lich_lam_viec/:url'
            },
            {
                match: { collection: 'keHoachPhatTrien' },
                pattern: 'ke_hoach_phat_trien/:url'
            },
             {
                match: { collection: 'vanBanPhapLuat' },
                pattern: 'van_ban_phap_luat/:url'
            }, {
                match: { collection: 'tinAnNinhTratTu' },
                pattern: 'tin_an_ninh_trat_tu/:url'
            },
            {
                match: { collection: 'hoatDongCuaLanhDao' },
                pattern: 'hoat_dong_cua_lanh_dao/:url'
            },
             {
                match: { collection: 'huongDan' },
                pattern: 'huong_dan/:url'
            },
             {
                match: { collection: 'chinhSach' },
                pattern: 'chinh_sach/:url'
            },
            {
                match: { collection: 'tinAnToanGiaoThong' },
                pattern: 'tin_an_toan_giao_thong/:url'
            },
            {
                match: { collection: 'tinYTeGiaoDuc' },
                pattern: 'tin_y_te_giao_duc/:url'
            },
             {
                match: { collection: 'khenThuongXuPhat' },
                pattern: 'khen_thuong_xu_phat/:url'
            }

        ]
    },

    'metalsmith-layouts': {
        '_enable': true,
        'engine': 'handlebars',
        'directory': `${site.layoutRoot}`,
        'partials': `${site.layoutRoot}/partial`
    },

    'metalsmith-html-minifier': {
        '_enable': true,
        'removeAttributeQuotes': false,
        'keepClosingSlash': true,
        'removeRedundantAttributes': false
    }
}


module.exports = site;
