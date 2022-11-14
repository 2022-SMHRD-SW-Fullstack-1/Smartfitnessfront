import React from 'react'

const MyBooksTb = (props) => {



  return (
    <>
    <tr>
        <td>
            {props.start}
        </td>
        <td>
            {props.end}
        </td>
        <td>
            {props.name}
        </td>
        <td>
          <button>Cancel</button>
        </td>
    </tr>
    </>
  )
}

export default MyBooksTb