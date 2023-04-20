
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
                const $body = $('body')
                for(const agent in data){
                   const agentInfo = data[agent];
                   if(agentInfo.isPlayableCharacter===true){
                    const name = agentInfo.displayName;
                    const backgroundGradient = agentInfo.backgroundGradientColors;
                    const gradient = backgroundGradient.map(color => `#${color}`);
                    const portrait = agentInfo.fullPortrait;
                    const description = agentInfo.description;
                    const role = agentInfo.role.description;
                    const className = agentInfo.role.displayName;
                    const abilities = {};
                    for(ability in agentInfo.abilities){
                        abilities[agentInfo.abilities[ability].displayName] = agentInfo.abilities[ability].description;
                    }
                    const $ability = $("<div>").text("Abilities").addClass("abilities");
                    for(ability in abilities){
                        const list = $("<p>").text(`${ability}: ${abilities[ability]}`) ;
                        $ability.append(list);
                    }
                    const $div = $(".agent");
                    const $img = $("<img>").addClass("image").attr("src", portrait);
                    $($body).css({background: `linear-gradient(${gradient})` });
                    const $name = $('<p>').text(name).addClass("name");
                    const $p = $("<p>").text(description).addClass("summary");
                    const $role = $("<div>").text(`Class: ${className}`).addClass("role");
                    const $roleInfo = $("<p>").text(role);
                    $role.append($roleInfo);
                    $div.append($name);
                    $div.append($p);
                    $div.append($img);
                    $div.append($role);
                    $div.append($ability);
                    $body.append($div);
                   
                  }    
               }
           });

        });
    }
});
