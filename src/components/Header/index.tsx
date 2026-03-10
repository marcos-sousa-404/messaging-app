import { Stack } from "@chakra-ui/react";
import { Button, ThemeSwitcher } from '@/components';
import useLogout from "@/hooks/useLogout";

const Header = () => {
    const { logout } = useLogout();


    return <Stack as='header' sx={{ boxShadow: 'md', width: '100%', height: '4rem', alignItems: 'center', justifyContent: 'flex-end', paddingX: 6, flexDir: 'row' }}>
        <Button onClick={logout} colorScheme="brand" size="sm">
            Sair da conta
        </Button>
        <ThemeSwitcher />
    </Stack>
}

export default Header;

export interface HeaderProps {

}