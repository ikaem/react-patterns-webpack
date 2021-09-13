import React, { memo, useEffect } from 'react'

type Props = {
	me: 'you'
}

type State = {
	issues: {
		name: string
	}[]
}

export class ClassComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			issues: [],
		}
	}
}

export const HookedComponent: React.FC<Props> = memo(({ me }) => {
	useEffect(() => {
		// console.log('Rendering Hooked Component')
	})
	return <div>Hello, {me}</div>
})
