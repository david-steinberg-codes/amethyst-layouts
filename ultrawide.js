function layout() {
	return {
		name: "Ultrawide",
		initialState: {
			mainPaneCount: 1, //TODO
			mainPaneWidthPercentage: 50,
			percentageChange: 2,
			rowCount: 2 //TODO
		},
		commands: {
			command1: {
				description: "Shrink main pane",
				updateState: (state) => {
					return { ...state, mainPaneWidthPercentage: Math.max(state.percentageChange, state.mainPaneWidthPercentage - state.percentageChange)}
				}
			},
			command2: {
				description: "Expand main pane",
				updateState: (state) => {
					return { ...state, mainPaneWidthPercentage: Math.min(100, state.mainPaneWidthPercentage + state.percentageChange)}
				}
			}
		},
		getFrameAssignments: (windows, screenFrame, state) => {
			const mainPaneWidth = screenFrame.width / (100 / state.mainPaneWidthPercentage)
			const secondaryWindows = Math.max(windows.length - state.mainPaneCount, 0)
			const secondaryCols = Math.ceil(secondaryWindows / 2)
			const secondaryWidth = (screenFrame.width - mainPaneWidth) / secondaryCols
			const secondaryHeight = screenFrame.height / state.rowCount

			return windows.reduce((frames, window, index) => {
				const isMain = index < state.mainPaneCount
				const secondaryIndex = index - state.mainPaneCount
				let frame

				if (isMain) {
					frame = {
						x: screenFrame.x,
						y: screenFrame.y,
						width: mainPaneWidth,
						height: screenFrame.height
					}
				} else {
					frame = {
						x: screenFrame.x + mainPaneWidth + (Math.floor(secondaryIndex / 2) * secondaryWidth),
						y: screenFrame.y + (secondaryIndex % 2 == 0 ? 0 : secondaryHeight),
						width: secondaryWidth,
						height: secondaryHeight
					}
				}
				
				return { ...frames, [window.id]: frame }
			}, {})
		}
	}
}


// Note that all origin points are top-left corner
