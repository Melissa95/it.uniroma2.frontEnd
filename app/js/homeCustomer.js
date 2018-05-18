app.controller('ctrlCust', function($scope,$http,$location) {

    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    $scope.showMenu = function() {
        document.getElementById("navAccount").classList.toggle("show");
    }

// Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.nav-link dropdown-toggle')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
});