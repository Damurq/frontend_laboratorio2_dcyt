<OutlinedInput
    className={classes.searchControl}
    id="input-search-profile"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Search profile options"
    startAdornment={
        <InputAdornment position="start">
            <IconSearch stroke={1.5} size="1.3rem" className={classes.startAdornment} />
        </InputAdornment>
    }
    aria-describedby="search-helper-text"
    inputProps={{
        'aria-label': 'weight'
    }}
/>

// paper & background
$paper: #1d1919;

// primary
$primaryLight: #302b2b;
$primaryMain: #2196f3;
$primaryDark: #1e88e5;
$primary200: #90caf9;
$primary800: #1565c0;

// secondary
$secondaryLight: #000000;
$secondaryMain: #673ab7;
$secondaryDark: #5e35b1;
$secondary200: #b39ddb;
$secondary800: #4527a0;

// success Colors
$successLight: #b9f6ca;
$success200: #69f0ae;
$successMain: #00e676;
$successDark: #00c853;

// error
$errorLight: #ef9a9a;
$errorMain: #f44336;
$errorDark: #c62828;

// orange
$orangeLight: #fbe9e7;
$orangeMain: #ffab91;
$orangeDark: #d84315;

// warning
$warningLight: #fff8e1;
$warningMain: #ffe57f;
$warningDark: #ffc107;

// grey
$grey900: #fafafa;
$grey700: #f5f5f5;
$grey600: #eeeeee;
$grey500: #e0e0e0;
$grey300: #9e9e9e;
$grey200: #757575;
$grey100: #616161;
$grey50: #202020;

// ===========================|| JAVASCRIPT ||=========================== //

:export {
    // paper & background
    paper: $paper;

    // primary
    primaryLight: $primaryLight;
    primary200: $primary200;
    primaryMain: $primaryMain;
    primaryDark: $primaryDark;
    primary800: $primary800;

    // secondary
    secondaryLight: $secondaryLight;
    secondary200: $secondary200;
    secondaryMain: $secondaryMain;
    secondaryDark: $secondaryDark;
    secondary800: $secondary800;

    // success
    successLight: $successLight;
    success200: $success200;
    successMain: $successMain;
    successDark: $successDark;

    // error
    errorLight: $errorLight;
    errorMain: $errorMain;
    errorDark: $errorDark;

    // orange
    orangeLight: $orangeLight;
    orangeMain: $orangeMain;
    orangeDark: $orangeDark;

    // warning
    warningLight: $warningLight;
    warningMain: $warningMain;
    warningDark: $warningDark;

    // grey
    grey50: $grey50;
    grey100: $grey100;
    grey200: $grey200;
    grey300: $grey300;
    grey500: $grey500;
    grey600: $grey600;
    grey700: $grey700;
    grey900: $grey900;
}
