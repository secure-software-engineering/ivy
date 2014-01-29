var Calculations = function() {
    this.getInteractionTypeFrequencyArray = function(interactionData) {
        // Result map.
        var frequency = {};
        var interactionType;

        // Traverse array.
        for (var i in interactionData) {
            // Get current interaction.
            var currentInteraction = interactionData[i];

            // Get interaction type.
            interactionType = currentInteraction.interaction_type;

            // Add to frequency.
            if (interactionType in frequency)
                frequency[interactionType]++;
            else
                frequency[interactionType] = 1;
        }

        // Generate array from map.
        var dataArray = [];
        for (interactionType in frequency) {
            // Hack to show absolute numbers in labels
            var label = interactionType + ' (' + frequency[interactionType] + ')';
            dataArray.push([label, frequency[interactionType]]);

            //dataArray.push([interactionType, frequency[interactionType]]);
        }

        // Return frequency array.
        return dataArray;
    };
};

// Register Calculations class globally.
window.Calculations = new Calculations();
