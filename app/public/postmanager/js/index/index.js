$(function() {
    dpd.users.me(function(result) {
        !result && (window.location.href = '/');
        app();
    });

    function app() {
        CKEDITOR.replace('editor1');
        $('form').on('submit', function() {
            if (window.location.hash.length) {
                dpd.news.post({
                    id: window.location.hash.substr(1, window.location.hash.length),
                    header: $('#title').val(),
                    sContent: $('#s-content').val(),
                    content: CKEDITOR.instances.editor1.getData()
                });
            } else {
                dpd.news.post({
                    header: $('input').val(),
                    sContent: $('#s-content').val(),
                    content: CKEDITOR.instances.editor1.getData()
                });
            }
            window.location.reload();
        });

        if (window.location.hash.length) {
            dpd.news.get({id: window.location.hash.substr(1, window.location.hash.length)}, function(news) {
                $('#s-content').val(news.sContent);
                $('#title').val(news.header);
                CKEDITOR.instances.editor1.setData(news.content);
            });
        }
        ;
    }
});
  