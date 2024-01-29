## Memo

--- When parent is being changed - it is rendering itself and his children.
--- If we don’t want to render the child if none of its props is changing, then we use:
--- “import {memo} from “react”
--- export default memo(<ChildComponentName>)”

## useCallback

--- Passing a function (declared and implemented in the parent) to the child as a prop so that the child is executing it inside. In that case the reference to that function is being changed in every parent rendering. So the “memo” is not working.
--- we’ll wrap the function in useCallback and will not pass any dependencies because we don’t want it to ever change.

## useMemo

--- Use useMemo when you want to memoized (store in cache) the value after complex or long computation and whenever some of the dependencies, passed in that hook, is changed then it will recompute that again.
