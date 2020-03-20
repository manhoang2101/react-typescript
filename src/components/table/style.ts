import { createStyles, Theme } from "@material-ui/core";
import { colors } from "@material-ui/core";
const style = (theme: Theme) => createStyles(
    {
        table: {
            maxWidth: '100%'
        },
        root: {
            width: '100%',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        topHeader: {
            border: '2px solid #ccc',
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '7px',
            background: colors.grey[100]
        },
        topHeaderHasChildren: {
            background: colors.green[100],

        },
        topHeaderGroup: {
            border: '2px solid #ccc',
            background: colors.grey[100],
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 600,
            padding: '7px',
        },
        topHeaderNotGroup:
        {
            border: '2px solid #ccc',
            background: colors.grey[100],
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 600,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }
)
export default style