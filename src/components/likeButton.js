import React, { useState } from 'react'
import { useAddReactionMutation, useRemoveReactionMutation } from '../graphql/mutations'
import {ReactComponent as Like} from './../assets/icons/like.svg'
import {ReactComponent as LikeBlack} from './../assets/icons/like_black.svg'

function LikeButton({ pid, current_like }) {
    const initialState = current_like ? true : false
    const [like, setLike] = useState(initialState)
    const [addReaction, addMutationResults ] = useAddReactionMutation()
    const [removeReaction, removeMutationResults ] = useRemoveReactionMutation()

    const handleLike = async () => {
        await addReaction(pid)
        setLike(true)
    }
    const handleDislike = async () => {
        await removeReaction(pid)
        setLike(false)
    }

    return (
        <div style={{ width: '30px'}}>
            {like ? <LikeBlack onClick={handleDislike} /> : <Like onClick={handleLike}/> }
        </div>
    )
}

export default LikeButton
