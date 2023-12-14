function colorUs () {

    const source = document.getElementById("hbs_color").innerHTML;
    const template = Handlebars.compile(source);


    num = localStorage.getItem("value")
    console.log(`This is value: ${num}`)

    customValues = {
        mainColor:   "--val3_WISE",
        inputColor: "--val3_WISE_muted",
        accent:       "--val3_WISE_muted",

    };
    

    switch (Number(num)) {
        
        case 1:
            customValues.mainColor = "--val1_KWGE"
            customValues.accent = "--val1_KWGE_muted"
            break
        case 2:
            customValues.mainColor = "--val2_FIDE"
            customValues.accent = "--val2_FIDE_muted"
            break
        case 3:
            customValues.mainColor = "--val3_WISE"
            customValues.accent = "--val3_WISE_muted"
            break
        case 4:
            customValues.mainColor = "--val4_JUST"
            customValues.accent = "--val4_JUST_muted"
            break
        case 5:
            customValues.mainColor = "--val5_ASOC"
            customValues.accent = "--val5_ASOC_muted"
            break
    }

    // console.log(customValues.mainColor)

            customValues.inputColor = customValues.accent




    const htmlInput = template(customValues);
    document.getElementById("result").innerHTML = htmlInput;

   
}