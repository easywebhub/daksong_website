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
        // collection theo file pattern + test limit
        'blog': {
            'pattern': 'blog/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'tinKinhTe': {
            'pattern': 'tin-kinh-te/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        'thongTinDieuHanh': {
            'pattern': 'thong-tin-dieu-hanh/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
         'tinVanHoa': {
            'pattern': 'tin_van_hoa/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        },
        // collection theo key trong metadata `"collection": "baiviet"`
        'baiviet': {
            'sortBy': 'date',
            'reverse': true
        },
        'tinAnNinhTrucTu': {
            'pattern': 'tin_an_ninh_truc_tu/**/*.html',
            'sortBy': 'date',
            'reverse': true,
        }
    },



    'metalsmith-pagination': {
        '_enable': true,
        'collections.blog': {
            'perPage': 3,
            'layout': 'blog.html',
            'first': 'blog/index.html',
            'path': 'blog/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Title of metalsmith-pagination file site.js'
            }
        },
        
        'collections.tinAnNinhTrucTu': {
            'perPage': 5,
            'layout': 'tin_an_ninh_truc_tu_layout.html',
            'first': 'tin_an_ninh_truc_tu/index.html',
            'path': 'tin_an_ninh_truc_tu/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Tin an ninh trực tự'
            }

        },

        'collections.tinKinhTe': {
            'perPage': 5,
            'layout': 'tin-kinh-te-layout.html',
            'first': 'tin-kinh-te/index.html',
            'path': 'tin-kinh-te/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Tin kinh tế'
            }

        },
        'collections.thongTinDieuHanh': {
            'perPage': 5,
            'layout': 'thong-tin-dieu-hanh.html',
            'first': 'thong-tin-dieu-hanh/index.html',
            'path': 'thong-tin-dieu-hanh/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'Chỉ đạo điều hành'
        }},
         'collections.tinVanHoa': {
            'perPage': 5,
           'layout': 'tin_van_hoa_layout.html',
            'first': 'tin_van_hoa/index.html',
            'path': 'tin_van_hoa/:num/index.html',
            'noPageOne': true,
            'pageMetadata': {
                'title': 'tin van hoa'
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
                    match: { collection: 'thongTinDieuHanh' },
                    pattern: 'thong-tin-dieu-hanh/:url'
                },
                {
                    match: { collection: 'tinVanHoa' },
                    pattern: 'tin_van_hoa/:url'
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
