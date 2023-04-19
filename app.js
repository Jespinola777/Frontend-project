
$.get(`https://valorant-api.com/v1/agents`, function (data) {
     obj={};
     for(agent in data.data){
        const agentInfo = data.data[agent];
        obj[agentInfo.displayName] = agentInfo.uuid   
    }
    const $dropDown = $(".dropdown-content")
    for (let property in obj) {
        const $a = $("<a></a>").text(property)
        property = obj[property];
        $a.attr('href', property)
        $dropDown.append($a)
        $a.on('click', function(event) {
            $(".agent").empty()
            event.preventDefault();
            const value = $(this).attr('href');
            
            $.get(`https://valorant-api.com/v1/agents/${value}`, function (data) {
                console.log(data)
                $body = $('body')
                for(agent in data){
                   const agentInfo = data[agent];
                   console.log(agentInfo)
                   if(agentInfo.isPlayableCharacter===true){
                    const name = agentInfo.displayName
                    const background = agentInfo.background
                    const backgroundGradient = agentInfo.backgroundGradientColors
                    const gradient = backgroundGradient.map(color => `#${color}`);
                    const portrait = agentInfo.fullPortrait
                    const description = agentInfo.description
                    const displayIcon = agentInfo.displayIcon
                   
                    console.log(displayIcon)
                    const $div = $(".agent")
                    $img = $("<img>").addClass("image").attr("src", portrait)
                    $div.css({background: `linear-gradient(${gradient})` });
                    $name = $('<p>').text(name).addClass("name")
                    $p = $("<p>").text(description)
                    $div.append($name)
                    $div.append($p)
                    $div.append($img)
                    $body.append($div)
                   
                  }    
               }
           });

        });
      }
});
