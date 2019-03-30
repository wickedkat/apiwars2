let format = {

    formatDiameter: function formatDiameter(diameter) {
        return diameter.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },

    formatSurfaceWater: function formatSurfaceWater(water) {
        if (water == 'unknown') {
            return 'unknown'
        }
        return water + '%'
    },

    formatPopulation: function formatPopulation(population)
    {
        if (population == 'unknown') {
            return 'unknown'
        }
        return population.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' people'
    },

    formatHeight: function formatHeight(height) {
        if (height == 'unknown') {
            return 'unknown'
        }
        return height.replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,') + ' m'
    },

    formatMass: function formatMass(mass) {
        if (mass == 'unknown') {
            return 'unknown'
        }
        return mass + ' kg'
    },

    formatGender: function formatGender(gender) {
        switch (gender) {
            case 'female':
                return '<i class="fas fa-venus" style="font-size: 22px; color:turquoise"></i>';
                break;
            case 'male':
                return '<i class="fas fa-mars" style="font-size: 22px; color:mediumpurple"></i>';
                break;
            default:
                return 'n/a';
        }
    }
}
