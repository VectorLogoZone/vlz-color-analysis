$(function() {
    $("#theForm").submit(function() {
        var url = $("input[name='url']").val();

        var result = $("#results");
        result.empty();
        result.text("Analyzing " + url);
        ("get colors! for " + url);
        $.ajax( {
            data: { "url": url },
            dataType: "json",
            error: function(xhr, status, err) { console.error("Ajax error: " + status + " (" + err + ")"); },
            method: "POST",
            success: function(data, status, xhr) {
                console.log("Ajax success: " + status + " data=" + JSON.stringify(data));
                if (!data.success) {
                    result.text("Analysis failed: " + data.message);
                    return;
                }
                result.empty();
                for (var loop in data.colors) {
                    var color = data.colors[loop];
                    console.log(color);
                    result.append($("<div>").css("background-color", color).css("width", "40px").css("height", "30px").css("display", "inline-block").css("vertical-align", "middle"));
                    result.append($("<span>").text(color));
                    result.append($("<br>"));
                }
                result.append($("<img>").attr("src", data.url).css("max-width", "768px").css("max-height", "256px").css("height", "100%"));
            },
            url: "/api"
        });
        return false;
    });
});
